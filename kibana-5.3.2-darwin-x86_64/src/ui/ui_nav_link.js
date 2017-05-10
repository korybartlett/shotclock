'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var UiNavLink = function UiNavLink(uiExports, spec) {
  _classCallCheck(this, UiNavLink);

  this.id = spec.id;
  this.title = spec.title;
  this.order = spec.order || 0;
  this.url = '' + (uiExports.urlBasePath || '') + spec.url;
  this.subUrlBase = '' + (uiExports.urlBasePath || '') + (spec.subUrlBase || spec.url);
  this.description = spec.description;
  this.icon = spec.icon;
  this.linkToLastSubUrl = spec.linkToLastSubUrl === false ? false : true;
  this.hidden = spec.hidden || false;
  this.disabled = spec.disabled || false;
  this.tooltip = spec.tooltip || '';
};

exports['default'] = UiNavLink;
module.exports = exports['default'];
