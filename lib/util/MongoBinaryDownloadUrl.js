'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/* eslint-disable class-methods-use-this */

var _getos2 = require('getos');

var _getos3 = _interopRequireDefault(_getos2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOWNLOAD_URI = 'https://downloads.mongodb.org';

var MongoBinaryDownloadUrl = function () {
  function MongoBinaryDownloadUrl(_ref) {
    var platform = _ref.platform,
        arch = _ref.arch,
        version = _ref.version,
        os = _ref.os;

    _classCallCheck(this, MongoBinaryDownloadUrl);

    this.platform = this.translatePlatform(platform);
    this.arch = this.translateArch(arch, this.platform);
    this.version = version;
    this.os = os;
  }

  _createClass(MongoBinaryDownloadUrl, [{
    key: 'getDownloadUrl',
    value: function () {
      var _ref2 = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
        var archive;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getArchiveName();

              case 2:
                archive = _context.sent;
                return _context.abrupt('return', `${DOWNLOAD_URI}/${this.platform}/${archive}`);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getDownloadUrl() {
        return _ref2.apply(this, arguments);
      }

      return getDownloadUrl;
    }()
  }, {
    key: 'getArchiveName',
    value: function () {
      var _ref3 = _asyncToGenerator(_regenerator2.default.mark(function _callee2() {
        var name, osString;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                name = `mongodb-${this.platform}-${this.arch}`;
                osString = void 0;

                if (!(this.platform === 'linux' && this.arch !== 'i686')) {
                  _context2.next = 8;
                  break;
                }

                if (this.os) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 6;
                return this.getos();

              case 6:
                this.os = _context2.sent;

              case 7:
                osString = this.getLinuxOSVersionString(this.os);

              case 8:

                if (osString) {
                  name += osString ? `-${osString}` : '';
                }

                name += `-${this.version}.${this.getArchiveType()}`;

                return _context2.abrupt('return', name);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getArchiveName() {
        return _ref3.apply(this, arguments);
      }

      return getArchiveName;
    }()
  }, {
    key: 'getArchiveType',
    value: function getArchiveType() {
      return this.platform === 'win32' ? 'zip' : 'tgz';
    }
  }, {
    key: 'getos',
    value: function () {
      var _ref4 = _asyncToGenerator(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', new Promise(function (resolve, reject) {
                  (0, _getos3.default)(function (e, os) {
                    if (e) reject(e);
                    resolve(os);
                  });
                }));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getos() {
        return _ref4.apply(this, arguments);
      }

      return getos;
    }()
  }, {
    key: 'getLinuxOSVersionString',
    value: function getLinuxOSVersionString(os) {
      if (/ubuntu/i.test(os.dist)) {
        return this.getUbuntuVersionString(os);
      } else if (/elementary OS/i.test(os.dist)) {
        return this.getElementaryOSVersionString(os);
      } else if (/suse/i.test(os.dist)) {
        return this.getSuseVersionString(os);
      } else if (/rhel/i.test(os.dist) || /centos/i.test(os.dist) || /scientific/i.test(os.dist)) {
        return this.getRhelVersionString(os);
      } else if (/fedora/i.test(os.dist)) {
        return this.getFedoraVersionString(os);
      } else if (/debian/i.test(os.dist)) {
        return this.getDebianVersionString(os);
      } else {
        return '';
      }
      // throw new Error(`Cannot determine version string for ${JSON.stringify(os)}`);
    }
  }, {
    key: 'getDebianVersionString',
    value: function getDebianVersionString(os) {
      var name = 'debian';
      var release = parseFloat(os.release);
      if (release >= 8.1) {
        name += '81';
      } else if (release >= 7.1) {
        name += '71';
      }
      return name;
    }
  }, {
    key: 'getFedoraVersionString',
    value: function getFedoraVersionString(os) {
      var name = 'rhel';
      var fedoraVer = parseInt(os.release, 10);
      if (fedoraVer > 18) {
        name += '70';
      } else if (fedoraVer < 19 && fedoraVer >= 12) {
        name += '62';
      } else if (fedoraVer < 12 && fedoraVer >= 6) {
        name += '55';
      }
      return name;
    }
  }, {
    key: 'getRhelVersionString',
    value: function getRhelVersionString(os) {
      var name = 'rhel';
      if (/^7/.test(os.release)) {
        name += '70';
      } else if (/^6/.test(os.release)) {
        name += '62';
      } else if (/^5/.test(os.release)) {
        name += '55';
      }
      return name;
    }

    // eslint-disable-next-line no-unused-vars

  }, {
    key: 'getElementaryOSVersionString',
    value: function getElementaryOSVersionString(os) {
      return 'ubuntu1404';
    }
  }, {
    key: 'getSuseVersionString',
    value: function getSuseVersionString(os) {
      var _ref5 = os.release.match(/(^11|^12)/) || [null],
          _ref6 = _slicedToArray(_ref5, 1),
          release = _ref6[0];

      if (release) {
        return `suse${release}`;
      }
      return '';
    }
  }, {
    key: 'getUbuntuVersionString',
    value: function getUbuntuVersionString(os) {
      var name = 'ubuntu';
      var ubuntuVer = os.release ? os.release.split('.') : [];
      var majorVer = parseInt(ubuntuVer[0], 10);
      // const minorVer: string = ubuntuVer[1];

      if (os.release === '12.04') {
        name += '1204';
      } else if (os.release === '14.04') {
        name += '1404';
      } else if (os.release === '14.10') {
        name += '1410-clang';
      } else if (majorVer === 14) {
        name += '1404';
      } else if (os.release === '16.04') {
        name += '1604';
      } else if (majorVer === 16) {
        name += '1604';
      } else {
        name += '1404';
      }
      return name;
    }
  }, {
    key: 'translatePlatform',
    value: function translatePlatform(platform) {
      switch (platform) {
        case 'darwin':
          return 'osx';
        case 'win32':
          return 'win32';
        case 'linux':
          return 'linux';
        case 'elementary OS':
          return 'linux';
        case 'sunos':
          return 'sunos5';
        default:
          throw new Error(`unsupported OS ${platform}`);
      }
    }
  }, {
    key: 'translateArch',
    value: function translateArch(arch, mongoPlatform) {
      if (arch === 'ia32') {
        if (mongoPlatform === 'linux') {
          return 'i686';
        } else if (mongoPlatform === 'win32') {
          return 'i386';
        }
        throw new Error('unsupported architecture');
      } else if (arch === 'x64') {
        return 'x86_64';
      } else {
        throw new Error('unsupported architecture, ia32 and x64 are the only valid options');
      }
    }
  }]);

  return MongoBinaryDownloadUrl;
}();

exports.default = MongoBinaryDownloadUrl;