/**
 * Author: Vadim
 * Date: 7/2/2014
 */
(function (window, undefined) {
    'use strict';

    var UNDEF_TYPE  = typeof(undefined),
        FUNC_TYPE   = 'function',
        versionNormalizerPattern = /[^0-9.]/ig;

    var VersionComparator = {
        compare: function compare(v1, v2) {
            if (v1 === v2) {
                return 0;
            }
            var versionOne = v1.replace(versionNormalizerPattern, '').split('.'),
                versionTwo = v2.replace(versionNormalizerPattern, '').split('.');
            for (var i = 0; i < Math.min(versionOne.length, versionTwo.length); i++) {
                var versionOnePart = versionOne[i],
                    versionTwoPart = versionTwo[i];

                if (parseInt(versionOnePart) === parseInt(versionTwoPart)) {
                    continue;
                }
                return parseInt(versionOnePart) > parseInt(versionTwoPart) ? 1 : -1;
            }
            return versionOne.length > versionTwo.length ? 1 : -1;
        }
    };

    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if (typeof(module) !== UNDEF_TYPE && module.exports) {
            exports = module.exports = VersionComparator;
        }
        exports.VersionComparator = VersionComparator;
    } else {
        // browser env
        window.VersionComparator = VersionComparator;
        // requirejs env (optional)
        if (typeof(define) === FUNC_TYPE && define.amd) {
            define(function () {
                return VersionComparator;
            });
        }
    }

})(this);