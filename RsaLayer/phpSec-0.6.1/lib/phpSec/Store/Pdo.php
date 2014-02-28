<?php
/**
 * phpSec - A PHP security library
 *
 * @author    Audun Larsen <larsen@xqus.com>
 * @copyright Copyright (c) Audun Larsen, 2011, 2012
 * @link      https://github.com/phpsec/phpSec
 * @license   http://opensource.org/licenses/mit-license.php The MIT License
 * @package   phpSec
 */
namespace phpSec\Store;

/**
 * Class for handling database storage.
 * @package phpSec
 */
class Pdo extends Store {

  public  $_hashType = 'sha256';
  private $dbh       = null;
  private $table     = null;

  /**
   * phpSec core Pimple container.
   */
  private $psl = null;

  public function __construct($loc, \phpSec\Core $psl) {
    $this->psl = $psl;

    /* Separate username and password from DSN */
    $parts = self::parseDsn($loc);
    $loc   = 'mysql:dbname='.$parts['dbname'].';host='.$parts['host'];

    /* We try to connect to the database. If this fails throw an error. */
    try {
      $this->dbh = new \PDO($loc, $parts['username'], $parts['password']);
    } catch(\PDOException $e) {
      throw new \phpSec\Exception\IOException('Database connection failed: ' . $e->getMessage());
      return false;
    }

    /* Cool, we connected to the databse with no problems.
     * Now let's try to find the table we want. */
    $this->table = $parts['table'];
    /* Got it!! No just kidding. */

    /* This is the expected structure of the table. Neat eh? */
    $storeTable = array(
      array(
        'Field'   => 'type',
        'Type'    => 'varchar(255)',
        'Null'    => 'NO',
        'Key'     => 'MUL',
        'Default' => NULL,
        'Extra'   => '',
      ),
      array(
        'Field'   => 'id',
        'Type'    => 'varchar(255)',
        'Null'    => 'NO',
        'Key'     => 'PRI',
        'Default' => NULL,
        'Extra'   => '',
      ),
      array(
        'Field'   => 'mac',
        'Type'    => 'binary(32)',
        'Null'    => 'NO',
        'Key'     => '',
        'Default' => NULL,
        'Extra'   => '',
      ),
      array(
        'Field'   => 'time',
        'Type'    => 'int(11) unsigned',
        'Null'    => 'NO',
        'Key'     => '',
        'Default' => NULL,
        'Extra'   => '',
      ),
      array(
        'Field'   => 'data',
        'Type'    => 'text',
        'Null'    => 'NO',
        'Key'     => '',
        'Default' => NULL,
        'Extra'   => '',
      ),
    );

    /* Ok, so. Let's get the structure of the table that's configured. Since PDO obviously
     * don't expect people to have nothing else than hard coded table names there is no
     * proper escape function for table/column names. We will do as suggested here
     * http://stackoverflow.com/questions/1542627/escaping-field-names-in-pdo-statements
     * by bobince and dissallow backquote, backslash and the nul character.
     * We will only do this here since we will verify the existence of the table later.
     * Oh.. I almost forgot. This fix is mySQL only! */
    $sth = $this->dbh->prepare(
      'DESCRIBE `'.str_replace(array('\\',"\0" ,'`'), '', $this->table).'`'
    );

    $sth->execute(array());
    $currentStructure = $sth->fetchAll(\PDO::FETCH_ASSOC);

    /* First we just match number of columns to make sure everything looks good, and to avoid
     * total disaster in the next part. Oh.. I almost forgot. If this fails everything explodes
     * in a nice old USER_ERROR! NOT! */
    if(sizeof($currentStructure) !== sizeof($storeTable)) {
      throw new \phpSec\Exception\IOException('Invalid table ('.$parts['dbname'].'.'.$this->table.') structure');
      return false;
    }

    /* Cool. The number is good. Check that the fields and stuff are all right. */
    for($i=0; $i < sizeof($storeTable); $i++) {
      $diff = array_diff_assoc($currentStructure[$i], $storeTable[$i]);
      if(sizeof($diff) > 0) {
        throw new \phpSec\Exception\IOException('Invalid table ('.$parts['dbname'].'.'.$this->table.') structure. '.var_export($diff, true));
        return false;
      }
    }

    /* Cool. No wait.. It was cool 10 lines ago. Supercool! We got this far. All is good. Go pary! */
    return true;
  }

  public function read($type, $id) {
    $crypto = $this->psl['crypt/crypto'];

    /* The first part is prettu basic. Get stuff from databse. */
    $sth = $this->dbh->prepare(
      'SELECT * FROM '.$this->table.' WHERE type = :type AND id = :id LIMIT 1'
    );

    $data = array(
      'id'    => $id,
      'type'  => $type,
    );
    $sth->execute($data);

    $data = $sth->fetch(\PDO::FETCH_ASSOC);
    if($data === false) {
      return false;
    }

    /* Calculate expected MAC. */
    $mac = $crypto->pbkdf2($data['data'], $id, 1000, 32);

    /* Compare MAC */
    if($mac != $data['mac']) {
      throw new \phpSec\Exception\GeneralSecurityException('Message authentication code invalid while reading store');
      return false;
    }

    /* And success! */
    return unserialize($data['data']);
  }

  public function write($type, $id, $data) {
    $crypto = $this->psl['crypt/crypto'];

    /* Delete existing data first, to prevent a huge database. */
    $this->delete($type, $id);

    /* Prepeare query. */
    $sth = $this->dbh->prepare(
      'INSERT INTO '.$this->table.' (`id`, `mac`, `time`, `type`, `data`)' .
      'VALUES(:id, :mac, :time, :type, :data)'
    );

    /* Serialize data, and create a MAC. */
    $data = serialize($data);
    $mac  = $crypto->pbkdf2($data, $id, 1000, 32);

    /* We use this array to say what data goes where in the query. */
    $data = array(
      'id'   => $id,
      'mac'  => $mac,
      'time' => time(),
      'type' => $type,
      'data' => $data,
    );

    /* And, insert. */
    return $sth->execute($data);
  }

  public function delete($type, $id){
    $sth = $this->dbh->prepare(
      'DELETE FROM '.$this->table.' WHERE type = :type AND id = :id'
    );

    $data = array(
      'id'   => $id,
      'type' => $type,
    );

    return $sth->execute($data);
  }

  public function listIds($type) {
    $ids = array();

    $sth = $this->dbh->prepare(
      'SELECT * FROM '.$this->table.' WHERE type = :type'
    );

    $data = array(
      'type' => $type,
    );

    $sth->execute($data);

    while($row = $sth->fetch(\PDO::FETCH_ASSOC)) {
      $ids[] = $row['id'];
    }

    return $ids;
  }

  public function meta($type, $id) {
    $sth = $this->dbh->prepare(
      'SELECT * FROM '.$this->table.' WHERE type = :type AND id = :id LIMIT 1'
    );

    $data = array(
      'id'   => $id,
      'type' => $type,
    );

    $sth->execute($data);

    $meta = $sth->fetch(\PDO::FETCH_ASSOC);
    if($meta === false) {
      return false;
    }

    $obj = new \StdClass;

    $obj->id   = $meta['id'];
    $obj->mac  = $meta['mac'];
    $obj->time = $meta['time'];

    return $obj;
  }

  /**
   * Extract configuration variables from the DSN.
   *
   * @param string $dsn
   *   DSN to extract variables from.
   *
   * @return array
   *   Returns an array with variable names as keys with corresponding values.
   */
  private function parseDsn($dsn) {
    $parsed = array();

    $typeEnd = strpos($dsn, ':');
    $dbType = substr($dsn, 0, $typeEnd);
    $parsed['dbtype'] = $dbType;

    $dsn = substr($dsn, $typeEnd+1);

    $parts = explode(';', $dsn);
    foreach($parts as $part) {
      list($key, $val) = explode('=', $part);
      $parsed[$key] = $val;
    }

    return $parsed;
  }
}