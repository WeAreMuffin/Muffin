phpSec changelog
================

0.6.1: February 25. 2013 - xqus
* Clean up the way we start sessions.
* Add a timing safe comparison function (\phpSec\String\Compare).
* Use timing safe comparison when comparing hashes.
* Default password hashing method is now Bcrypt.

0.6.0: February 17. 2013 - xqus
-------------------------------
* [#111] Total rewrite: Now uses Pimple as DI container.
* [#113] Swap bcrypt prefix. Other small fixes to \phpSec\Crypt\Hash.
* Adds \phpSec\Http\Xfo, Implements HTTP X-Frame-Options.
* Adds \phpSec\Http\Hsts, Implements HTTP Strict Transport Security.
* Adds \phpSec\Http\Url, Impements URL manipulation prevention.
* Adds \phpSec\Auth\Mnemonic.php, Create easy to remember passphrases.
* [#107] phpSec throws exceptions instead of triggering errors.
* Updated tests.
* Various minor fixes.

0.5.1: December 12. 2012 - xqus
-------------------------------
* Fixes \phpSec\Text\Filter.

0.5.0: November 5. 2012 - xqus
------------------------------
* Added \phpSec\Auth\Google, Authenticate using Google Authenticator.
* Added \phpSec\Common\SplClassLoader, an improved autoloader.
* [#101] Added \phpSec\Common\Exec, method for executing programs in a PDO like way.
* Improved \phpSec\Common\Core\genUid().
* Added \phpSec\Crypt\Rand::bool(): Generate random boolean.
* Improved \phpSec\Crypt\Crypto. (Error messages and automatic padding).
* Fixed bug in session handler when setting custom encryption settings.
* [#100] Added support for Drupal and plain hashes in \phpSec\Crypt\Hash.
* Added \phpSec\Crypt\Hash::getInfo(), returns settings used to generate a hash.
* New class: \phpSec\String\Base32
* [#105] Core::getUid() should be static.

0.4.0: August 19. 2012 - xqus
-----------------------------
* Total restructure of library to comply with PSR-0.
* Version numbers now follows [Semantic Versioning](http://semver.org/)
* [#83] Added class \phpSec\Auth\Otpcard and moved PS OTP functionality from \phpSec\Auth\Otp to it.
* [#84, #85, #93, #94] Improvements to \phpSec\Auth\Otp.
* Fixed bug setting up storage on Windows platforms.
* New configuration option: Disable regeneration of session id for each request.
* [#91] Throw PHP notice if insecure pseudo-random data is generated.
* [#23] Added filename filter to \phpSec\Text\Filter::f().
* [#90] Improvements to pseudo-random data generator. (@ph-il)
* Adds support for [Authy](http://authy.com) authentication. 
* New autoloader.
* Code cleanup and small bug fixes.

beta-0.3: January 4. 2012 - xqus
--------------------------------
* [#66] phpSec can now run without storage configured.
* [#58] phpsecCrypt now pads data by default.
* [#81] phpsecPw now supports PBKDF2, and uses it as default.
* Added new password hashing class: phpsecHash. phpsecPw should not be used
  anymore.
* Fixed phpsecFilter::f().

beta-0.2: December 21. 2011 - xqus
----------------------------------
* [#43] Implemented PKCS7 padding in phpsecCrypt.
* [#62] Added phpsec::arrayCheck().
* [#63] Improved checking of json data passed to phpSec.
* Fixed call to error method in phpsecPw::check()
* [#51] phpsecPw now uses a binary salts.
* phpsecPw::age() removed.
* [#50] Session handler now uses a binary key to encrypt session data.
* [#42] Added mySQL support.
* Yubikey integration not considered experimental anymore.
  * [#48, #49] Improvements of the Yubikey integration.
  * [#75] Fixed: phpsecYubikey::getYubikeyId() could retrive wrong ID.
  * [#76] Fixed: phpsecYubikey::validOtp() to strict.
  * [#74] Fixed: phpsecYubikey::getResponse(): Number of attempts and timeout
          should be possible to configure.


beta-0.1: November 7. 2011 - xqus
---------------------------------
* [#33, #34]phpsec::f() is now phpsec::t(), and phpsec::f() is a simple XSS
  filter method.
* Removed the examples.php from source. See the online manual for examples:
  http://phpsec.xqus.com/manual
* Don't use session_regenerate_id() anymore, since it causes many bugs.
* Generate a stronger PHP session ID.
* [#30] Improve session hijacking protection.
* Improved the password hashing methods.
* Changed default encryption algorithm to RIJNDAEL-256.
* Added implemention of PBKDF2 as described in RFC 2898.
* Create a PBKDF2 MAC to ensure message integrity in phpsecCrypt. This breaks
  compability with older versions of phpSec.
* [#37] phpsecCrypt don't modify the encryption key anymore.
* Regenerate session ID in custom session handler.
* Stronger keys for encryption of session.
* Better error handling in phpSecCrypt.
* [#38] Storage class for general data storage for all sub-classes.
* [#41] Separate password, token and filter methods from core.
* Many minor fixes..

alpha-0.0.5: August 14. 2011 - xqus
-----------------------------------
* Added phpsecRand::arrayRand(): Method to select random keys from an array.
* Fixed bug in key generation method in phpsecCrypt().
  This means that data encrypted with phpSec alpha-0.0.4 and older will not
  decrypt in this version.

alpha-0.0.4: July 11. 2011 - xqus
---------------------------------
* [#25] Empty CSRF token creates hickups.
* Added initial GPG/PGP support. Still experimental.
* Added phpsecLog class to add better logging support.
  This means that phpsec::init() has to be called before setting the log dir:
  phpsecLog::$_logdir = 'filesystem:/var/www/phpSec/logs';
  Also phpsec::log() is now phpsecLog::log().
* Added syslog support to phpsecLog.
* phpsec::f() now accepts strings a array of data to filter.
* Improved error handling.
* phpsecCrypt::encrypt() performance improvements.
* Greatly improved key generation security in phpsecCrypt().
  This means that data encrypted with phpSec alpha-0.0.3 and older will not
  decrypt in this version.

alpha-0.0.3: March 9. 2011 - xqus
---------------------------------
* [#21] Use of phpSec session handler is now optional.
* [#17] phpsec::pwHash() now returns a JSON encoded array.
* Added Yubikey integration. See https://github.com/xqus/phpSec/wiki/Yubikey
* Added &type variables to phpsec::f().
* Many minor fixes..

alpha-0.0.2: February 5. 2011 - xqus
------------------------------------
* The library is no longer automatically initialized.
  You now need to call phpsec::init().
* Added encryption functions.
* Added random functions.
* Separated the library into smaller files.
* Added session encryption.
* Many minor changes..

Prealpha 0.0.1: January 16. 2011 - xqus
---------------------------------------

January 8. 2011 - xqus
----------------------
* First code written.
