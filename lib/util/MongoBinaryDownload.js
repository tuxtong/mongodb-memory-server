'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/* eslint-disable class-methods-use-this */

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _md5File = require('md5-file');

var _md5File2 = _interopRequireDefault(_md5File);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _decompress = require('decompress');

var _decompress2 = _interopRequireDefault(_decompress);

var _MongoBinaryDownloadUrl = require('./MongoBinaryDownloadUrl');

var _MongoBinaryDownloadUrl2 = _interopRequireDefault(_MongoBinaryDownloadUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoBinaryDownload = function () {
  function MongoBinaryDownload(_ref) {
    var platform = _ref.platform,
        arch = _ref.arch,
        downloadDir = _ref.downloadDir,
        version = _ref.version,
        http = _ref.http,
        debug = _ref.debug;

    _classCallCheck(this, MongoBinaryDownload);

    this.platform = platform || _os2.default.platform();
    this.arch = arch || _os2.default.arch();
    this.version = version || 'latest';
    this.http = http || {};
    this.downloadDir = _path2.default.resolve(downloadDir || 'mongodb-download');
    this.dlProgress = {
      current: 0,
      length: 0,
      totalMb: 0,
      lastPrintedAt: 0
    };

    if (debug) {
      if (debug.call && typeof debug === 'function' && debug.apply) {
        this.debug = debug;
      } else {
        this.debug = console.log.bind(null);
      }
    } else {
      this.debug = function () {};
    }
  }

  _createClass(MongoBinaryDownload, [{
    key: 'getMongodPath',
    value: function () {
      var _ref2 = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
        var binaryName, mongodPath, mongoDBArchive;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                binaryName = this.platform === 'win32' ? 'mongod.exe' : 'mongod';
                mongodPath = _path2.default.resolve(this.downloadDir, this.version, binaryName);

                if (!this.locationExists(mongodPath)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', mongodPath);

              case 4:
                _context.next = 6;
                return this.download();

              case 6:
                mongoDBArchive = _context.sent;
                _context.next = 9;
                return this.extract(mongoDBArchive);

              case 9:
                _fsExtra2.default.unlinkSync(mongoDBArchive);

                if (!this.locationExists(mongodPath)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', mongodPath);

              case 12:
                throw new Error(`Cannot find downloaded mongod binary by path ${mongodPath}`);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMongodPath() {
        return _ref2.apply(this, arguments);
      }

      return getMongodPath;
    }()
  }, {
    key: 'download',
    value: function () {
      var _ref3 = _asyncToGenerator(_regenerator2.default.mark(function _callee2() {
        var mbdUrl, url, archName, downloadLocation, tempDownloadLocation, mongoDBArchive, md5Remote, md5Local;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                mbdUrl = new _MongoBinaryDownloadUrl2.default({
                  platform: this.platform,
                  arch: this.arch,
                  version: this.version
                });
                _context2.next = 3;
                return _fsExtra2.default.ensureDir(this.downloadDir);

              case 3:
                _context2.next = 5;
                return mbdUrl.getDownloadUrl();

              case 5:
                url = _context2.sent;
                _context2.next = 8;
                return mbdUrl.getArchiveName();

              case 8:
                archName = _context2.sent;
                downloadLocation = _path2.default.resolve(this.downloadDir, archName);

                console.log('Downloading MongoDB:', url);
                tempDownloadLocation = _path2.default.resolve(this.downloadDir, `${archName}.downloading`);
                _context2.next = 14;
                return this.httpDownload(url, downloadLocation, tempDownloadLocation);

              case 14:
                mongoDBArchive = _context2.sent;
                _context2.next = 17;
                return this.downloadMD5(`${url}.md5`);

              case 17:
                md5Remote = _context2.sent;
                md5Local = _md5File2.default.sync(mongoDBArchive);

                if (!(md5Remote !== md5Local)) {
                  _context2.next = 21;
                  break;
                }

                throw new Error('MongoBinaryDownload: md5 check is failed');

              case 21:
                return _context2.abrupt('return', mongoDBArchive);

              case 22:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function download() {
        return _ref3.apply(this, arguments);
      }

      return download;
    }()
  }, {
    key: 'downloadMD5',
    value: function () {
      var _ref4 = _asyncToGenerator(_regenerator2.default.mark(function _callee3(md5url) {
        var signatureContent, signature;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _requestPromise2.default)(md5url);

              case 2:
                signatureContent = _context3.sent;

                this.debug(`getDownloadMD5Hash content: ${signatureContent}`);
                signature = signatureContent.match(/(.*?)\s/)[1];

                this.debug(`getDownloadMD5Hash extracted signature: ${signature}`);
                return _context3.abrupt('return', signature);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function downloadMD5(_x) {
        return _ref4.apply(this, arguments);
      }

      return downloadMD5;
    }()
  }, {
    key: 'extract',
    value: function () {
      var _ref5 = _asyncToGenerator(_regenerator2.default.mark(function _callee4(mongoDBArchive) {
        var binaryName, extractDir, filter;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                binaryName = this.platform === 'win32' ? 'mongod.exe' : 'mongod';
                extractDir = _path2.default.resolve(this.downloadDir, this.version);

                this.debug(`extract(): ${extractDir}`);
                _context4.next = 5;
                return _fsExtra2.default.ensureDir(extractDir);

              case 5:
                filter = this.platform === 'win32' ? function (file) {
                  return (/bin\/mongod.exe$/.test(file.path)
                  );
                } : function (file) {
                  return (/bin\/mongod$/.test(file.path)
                  );
                };
                _context4.next = 8;
                return (0, _decompress2.default)(mongoDBArchive, extractDir, {
                  // extract only `bin/mongod` file
                  filter,
                  // extract to root folder
                  map: function map(file) {
                    file.path = _path2.default.basename(file.path); // eslint-disable-line
                    return file;
                  }
                });

              case 8:
                if (this.locationExists(_path2.default.resolve(this.downloadDir, this.version, binaryName))) {
                  _context4.next = 10;
                  break;
                }

                throw new Error(`MongoBinaryDownload: missing mongod binary in ${mongoDBArchive}`);

              case 10:
                return _context4.abrupt('return', extractDir);

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function extract(_x2) {
        return _ref5.apply(this, arguments);
      }

      return extract;
    }()
  }, {
    key: 'httpDownload',
    value: function () {
      var _ref6 = _asyncToGenerator(_regenerator2.default.mark(function _callee5(httpOptions, downloadLocation, tempDownloadLocation) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', new Promise(function (resolve, reject) {
                  var fileStream = _fsExtra2.default.createWriteStream(tempDownloadLocation);

                  var req = _https2.default.get(httpOptions, function (response) {
                    _this.dlProgress.current = 0;
                    _this.dlProgress.length = parseInt(response.headers['content-length'], 10);
                    _this.dlProgress.totalMb = Math.round(_this.dlProgress.length / 1048576 * 10) / 10;

                    response.pipe(fileStream);

                    fileStream.on('finish', function () {
                      fileStream.close(function () {
                        _fsExtra2.default.renameSync(tempDownloadLocation, downloadLocation);
                        _this.debug(`renamed ${tempDownloadLocation} to ${downloadLocation}`);
                        resolve(downloadLocation);
                      });
                    });

                    response.on('data', function (chunk) {
                      _this.printDownloadProgress(chunk);
                    });

                    req.on('error', function (e) {
                      _this.debug('request error:', e);
                      reject(e);
                    });
                  });
                }));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function httpDownload(_x3, _x4, _x5) {
        return _ref6.apply(this, arguments);
      }

      return httpDownload;
    }()
  }, {
    key: 'printDownloadProgress',
    value: function printDownloadProgress(chunk) {
      this.dlProgress.current += chunk.length;

      var now = Date.now();
      if (now - this.dlProgress.lastPrintedAt < 2000) return;
      this.dlProgress.lastPrintedAt = now;

      var percentComplete = Math.round(100.0 * this.dlProgress.current / this.dlProgress.length * 10) / 10;
      var mbComplete = Math.round(this.dlProgress.current / 1048576 * 10) / 10;

      var crReturn = this.platform === 'win32' ? '\x1b[0G' : '\r';
      process.stdout.write(`Downloading MongoDB ${this.version}: ${percentComplete} % (${mbComplete}mb ` + `/ ${this.dlProgress.totalMb}mb)${crReturn}`);
    }
  }, {
    key: 'locationExists',
    value: function locationExists(location) {
      try {
        _fsExtra2.default.lstatSync(location);
        return true;
      } catch (e) {
        if (e.code !== 'ENOENT') throw e;
        return false;
      }
    }
  }]);

  return MongoBinaryDownload;
}();

exports.default = MongoBinaryDownload;