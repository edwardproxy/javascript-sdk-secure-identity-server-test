(function($) {
      $.cors = function(options) {
        options.success = options.success || function(data, text) {alert('no success callback specified');};
        options.error = options.error || function(xhr, text, thrown) {alert('no fail callback specified');};
        $.ajax(options);
      };
      
      $.corsSetup = function(options) {
        $.ajaxSetup(options);
      };
      
      // CORS Verbs
      $.getCORS = function(url, data, callback, type, headers, xhrFields) {
        options = {
          url: url,
          type: 'GET',
          data: data,
          success: callback,
          dataType: type,
          error: callback,
          headers: headers,
          xhrFields: xhrFields
        };
        $.cors(options);
      };
      $.postCORS = function(url, data, callback, type, headers, xhrFields) {
        options = {
          url: url,
          type: 'POST',
          data: data,
          success: callback,
          dataType: type,
          error: callback,
          headers: headers,
          xhrFields: xhrFields
        };
        $.cors(options);
      };
      $.putCORS = function(url, data, callback, type, headers, xhrFields) {
        options = {
          url: url,
          type: 'PUT',
          data: data,
          success: callback,
          dataType: type,
          error: callback,
          headers: headers,
          xhrFields: xhrFields
        };
        $.cors(options);
      };
      $.deleteCORS = function(url, data, callback, type, headers, xhrFields) {
        options = {
          url: url,
          type: 'DELETE',
          data: data,
          success: callback,
          dataType: type,
          error: callback,
          headers: headers,
          xhrFields: xhrFields
        };
        $.cors(options);
      };

      $.postCORSWithFile = function(url, data, callback, type, headers, xhrFields) {
          options = {
            url: url,
            type: 'POST',
            data: data,
            success: callback,
            dataType: type,
            error: callback,
            headers: headers,
            cache: false,
            contentType: false,
            processData: false,
            xhrFields: xhrFields
          };
          $.cors(options);
        };
      // CORS with JSON
      $.postJSON = function(url, data, callback) {
        $.ajaxSetup({
          contentType: 'application/json; charset=utf-8'
        });
        $.postCORS(url, JSON.stringify(data), callback, 'json');
      };
      $.putJSON = function(url, data, callback) {
        $.ajaxSetup({
          contentType: 'application/json; charset=utf-8'
        });
        $.putCORS(url, JSON.stringify(data), callback, 'json');
      };
      $.deleteJSON = function(url, data, callback) {
        $.deleteCORS(url, data, callback, 'json');
      };
      $.corsJSON = function(type, url, data, success, error) {
        $.ajaxSetup({
          error: error,
          contentType: 'application/json; charset=utf-8'
        });
        $.cors({
          type: type,
          url: url,
          data: data,
          dataType: 'json',
          success: success,
          error: error
        });
      };

      $.getURLParameter = function(name) {
        return decodeURIComponent((new RegExp('[#|?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))||null;
      };

})(jQuery);

//Cross-domain ajax for IE8+
$.ajaxTransport("+*", function( options, originalOptions, jqXHR ) {
	if(jQuery.browser.msie && window.XDomainRequest) {
		var xdr;
        return {
        		send: function( headers, completeCallback ) {
                // Use Microsoft XDR
                xdr = new XDomainRequest();
//                if(options.type == 'PUT' || options.type == 'DELETE') {
//                	var methodData = "_method=" + options.type;
//                	if(options.data) {
//                		options.data += "&" + methodData;
//                	} else {
//                		options.data = methodData;
//                	}
//                	options.type = 'POST';
//                }
                xdr.open(options.type, options.url);
                xdr.onload = function() {
                    if(this.contentType.match(/\/xml/)){
                        var dom = new ActiveXObject("Microsoft.XMLDOM");
                        dom.async = false;
                        dom.loadXML(this.responseText);
                        completeCallback(200, "success", [dom]);
                    } else {
                        completeCallback(200, "success", [this.responseText]);
                    }
                };
                
                xdr.ontimeout = function(){
                    completeCallback(408, "error", ["Request timed out."]);
                };
                
                xdr.onerror = function(){
                    completeCallback(404, "error", ["The requested resource could not be found."]);
                };
                
                xdr.send(options.data);
          },
          abort: function() {
              if(xdr)xdr.abort();
          }
        };
	}
});
// XMLHTTP JS class is is developed by Alex Serebryakov (#0.9.1)
// For more information, consult www.ajaxextended.com
// Stolen from http://bit.ly/cpTekr

// What's new in 0.9.1:
// - fixed the _createQuery function (used to force multipart requests)
// - fixed the getResponseHeader function (incorrect search)
// - fixed the _parseXML function (bug in the ActiveX parsing section)
// - fixed the _destroyScripts function (DOM errors reported)

jQuery.proxy_xmlhttp = function(apiURL) {

  // The following two options are configurable
  // you don't need to change the rest. Plug & play!
  var _maximumRequestLength = 1500;
  var _apiURL = apiURL || 'http://' + window.location.hostname + '/xmlhttp/';

  this.status = null;
  this.statusText = null;
  this.responseText = null;
  this.responseXML = null;
  this.synchronous = false;
  this.readyState = 0;
  
  this.onreadystatechange =  function() { };
  this.onerror = function() { };
  this.onload = function() { };
  
  this.abort = function() {
    _stop = true;
    _destroyScripts();
  };
  
  this.getAllResponseHeaders = function() {
    // Returns all response headers as a string
    var result = '';
    for (var property in _responseHeaders) {
      result += property + ': ' + _responseHeaders[property] + '\r\n';
    }
    return result;
  };
  
  this.getResponseHeader = function(name) {
    // Returns a response header value
    // Note, that the search is case-insensitive
    for(var property in _responseHeaders) {
      if(property.toLowerCase() == name.toLowerCase()) {
        return _responseHeaders[property];
      }
    }
    return null;
  };
  
  this.overrideMimeType = function(type) {
    _overrideMime = type;
  };
  
  this.open = function(method, url, sync, userName, password) {
    // Setting the internal values
    if (!_checkParameters(method, url)) {
        return;
    }
    _method = (method) ? method : '';
    _url = (url) ? url : '';
    _userName = (userName) ? userName : '';
    _password = (password) ? password : '';
    _setReadyState(1);
  };
  
  this.openRequest = function(method, url, sync, userName, password) {
    // This method is inserted for compatibility purposes only
    return this.open(method, url, sync, userName, password);
  };
  
  this.send = function(data) {
    if (_stop) {
        return;
    }
    var src = _createQuery(data);
    _createScript(src);
//    _setReadyState(2);
  };
  
  this.setRequestHeader = function(name, value) {
    // Set the request header. If the defined header
    // already exists (search is case-insensitive), rewrite it
    if (_stop) {
        return;
    }
    for(var property in _requestHeaders) {
      if(property.toLowerCase() == name.toLowerCase()) {
        _requestHeaders[property] = value; return;
      }
    }
    _requestHeaders[name] = value;
  };
  
  var _method = '';
  var _url = '';
  var _userName = '';
  var _password = '';
  var _requestHeaders = {
    "HTTP-Referer": escape(document.location),
    "Content-Type": "application/x-www-form-urlencoded"
  };
  var _responseHeaders = { };
  var _overrideMime = "";
  var self = this;
  var _id = '';
  var _scripts = [];
  var _stop = false;
  
  var _throwError = function(description) {
    // Stop script execution and run
    // the user-defined error handler
    self.onerror(description);
    self.abort();
    return false;
  };
  
  var _createQuery = function(data) {
    if(!data) {
      data = '';
    }
    var headers = '';
    for (var property in _requestHeaders) {
      headers += property + '=' + _requestHeaders[property] + '&';
    }
    var originalsrc = _method +
    '$' + _id + 
    '$' + _userName +
    '$' + _password + 
    '$' + headers + 
    '$' + _escape(data) +
    '$' + _url;
    var src = originalsrc;
    var max =  _maximumRequestLength, request = [];
    var total = Math.floor(src.length / max), current = 0;
    while(src.length > 0) {
      var query = _apiURL + '?' + 'multipart' + '$' + _id + '$' + current++ + '$' + total + '$' + src.substr(0, max);
      request.push(query);
      src = src.substr(max);
    }
    if(request.length == 1) {
      src = _apiURL + '?' + originalsrc;
    } else {
      src = request;
    }
    return src;
  };
  
  var _checkParameters = function(method, url) {
    // Check the method value (GET, POST, HEAD)
    // and the prefix of the url (http://)
    if(!method) {
      return _throwError('Please, specify the query method (GET, POST or HEAD)');
    }
    if(!url) {
      return _throwError('Please, specify the URL');
    }
    if(method.toLowerCase() != 'get' &&
      method.toLowerCase() != 'post' &&
      method.toLowerCase() != 'put' &&
      method.toLowerCase() != 'delete' &&
      method.toLowerCase() != 'options' &&
      method.toLowerCase() != 'head') {
      return _throwError('Please, specify either a GET, POST or a HEAD method');
    }
    if(url.toLowerCase().substr(0,7) != 'http://') {
      return _throwError('Only HTTP protocol is supported (http://)');
    }
    return true;
  };

  var _createScript = function(src) {
    if ('object' == typeof src) {
      for(var i = 0; i < src.length; i++) {
        _createScript(src[i]);
      }
      return true;
    }
    // Create the SCRIPT tag
    var script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    if (navigator.userAgent.indexOf('Safari')){
      script.charset = 'utf-8'; // Safari bug
    }
    script = document.getElementsByTagName('head')[0].appendChild(script);
    _scripts.push(script);
    return script;
  };
  
  var _escape = function(string) {
    // Native escape() function doesn't quote the plus sign +
    string = escape(string);
    string = string.replace('+', '%2B');
    return string;
  };
  
  var _destroyScripts = function() {
    // Removes the SCRIPT nodes used by the class
    for(var i = 0; i < _scripts.length; i++) {
      if(_scripts[i].parentNode) {
        _scripts[i].parentNode.removeChild(_scripts[i]);
      }
    }
  };
  
  var _registerCallback = function() {
    // Register a callback variable (in global scope)
    // that points to current instance of the class
    _id = 'v' + Math.random().toString().substr(2);
    window[_id] = self;
  };
  
  var _setReadyState = function(number) {
    // Set the ready state property of the class
    self.readyState = number;
    self.onreadystatechange();
    if(number == 4) {
      self.onload();
    }
  };
    
  var _parseXML = function() {
      var type = self.getResponseHeader('Content-type') + _overrideMime;
      if(!(type.indexOf('html') > -1 || type.indexOf('xml') > -1)) {
        return;
      }
      var xml;
      if(document.implementation &&
        document.implementation.createDocument &&
        navigator.userAgent.indexOf('Opera') == -1) {
        var parser = new DOMParser();
        xml = parser.parseFromString(self.responseText, "text/xml");
        self.responseXML = xml;
      } else if (window.ActiveXObject) {
        xml = new ActiveXObject('MSXML2.DOMDocument.3.0');
        if (xml.loadXML(self.responseText)) {
          self.responseXML = xml;
        }
      } else {
        xml = document.body.appendChild(document.createElement('div'));
        xml.style.display = 'none';
        xml.innerHTML = self.responseText;
        _cleanWhitespace(xml, true);
        self.responseXML = xml.childNodes[0];
        document.body.removeChild(xml);
     }
  };
  
  var _cleanWhitespace = function(element, deep) {
    var i = element.childNodes.length;
    if(i === 0) {
      return;
    }
    do {
      var node = element.childNodes[--i];
      if (node.nodeType == 3 && !_cleanEmptySymbols(node.nodeValue)) {
        element.removeChild(node);
      }
      if (node.nodeType == 1 && deep) {
        _cleanWhitespace(node, true);
      }
    } while(i > 0);
  };

  var _cleanEmptySymbols = function(string) {
    string = string.replace('\r', '');
    string = string.replace('\n', '');
    string = string.replace(' ', '');
    return (string.length === 0) ? false : true; 
  };
 
  this._parse = function(object) {
    // Parse the received data and set all
    // the appropriate properties of the class
    if(_stop) {
      return true;
    }
    if(object.multipart) {
      return true;
    }
    if(!object.success) {
      return _throwError(object.description);
    }
    _responseHeaders = object.responseHeaders;
    this.status = object.status;
    this.statusText = object.statusText;
    this.responseText = object.responseText;
    _parseXML();
    _destroyScripts();
    _setReadyState(4);
    return true;
  };
    
   _registerCallback();

};
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)try{b(d).triggerHandler("remove")}catch(e){}k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){try{b(this).triggerHandler("remove")}catch(d){}});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=
function(h){return!!b.data(h,a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):
d;if(e&&d.charAt(0)==="_")return h;e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=
b.extend(true,{},this.options,this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+
"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",
c);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*
 * jQuery File Upload Plugin 5.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global document, XMLHttpRequestUpload, Blob, File, FormData, location, jQuery */

(function ($) {
    'use strict';

    // The fileupload widget listens for change events on file input fields
    // defined via fileInput setting and drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files
    // using the fileupload API.
    // By default, files added via file input selection, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {
        
        options: {
            // The namespace used for event handler binding on the dropZone and
            // fileInput collections.
            // If not set, the name of the widget ("fileupload") is used.
            namespace: undefined,
            // The drop target collection, by the default the complete document.
            // Set to null or an empty collection to disable drag & drop support:
            dropZone: $(document),
            // The file input field collection, that is listened for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null or an empty collection to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            
            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },
            
            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uplaods, else
            // once for each file selection.
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows to override plugin options as well as define ajax settings.
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                data.submit();
            },
            
            // Other callbacks:
            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);
            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);
            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);
            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);
            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);
            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);
            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);
            // Callback for change events of the fileInput collection:
            // change: function (e, data) {}, // .bind('fileuploadchange', func);
            // Callback for drop events of the dropZone collection:
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);
            // Callback for dragover events of the dropZone collection:
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);
            
            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false
        },
        
        // A list of options that require a refresh after assigning a new value:
        _refreshOptionsList: ['namespace', 'dropZone', 'fileInput'],

        _isXHRUpload: function (options) {
            var undef = 'undefined';
            return !options.forceIframeTransport &&
                typeof XMLHttpRequestUpload !== undef && typeof File !== undef &&
                (!options.multipart || typeof FormData !== undef);
        },

        _getFormData: function (options) {
            var formData;
            if (typeof options.formData === 'function') {
                return options.formData(options.form);
            } else if ($.isArray(options.formData)) {
                return options.formData;
            } else if (options.formData) {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var total = data.total || this._getTotal(data.files),
                    loaded = parseInt(
                        e.loaded / e.total * (data.chunkSize || total),
                        10
                    ) + (data.uploadedBytes || 0);
                this._loaded += loaded - (data.loaded || data.uploadedBytes || 0);
                data.lengthComputable = true;
                data.loaded = loaded;
                data.total = total;
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger('progress', e, data);
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger('progressall', e, {
                    lengthComputable: true,
                    loaded: this._loaded,
                    total: this._total
                });
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload && xhr.upload.addEventListener) {
                xhr.upload.addEventListener('progress', function (e) {
                    that._onProgress(e, options);
                }, false);
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _initXHRData: function (options) {
            var formData,
                file = options.files[0];
            if (!options.multipart || options.blob) {
                // For non-multipart uploads and chunked uploads,
                // file meta data is not part of the request body,
                // so we transmit this data as part of the HTTP headers.
                // For cross domain requests, these headers must be allowed
                // via Access-Control-Allow-Headers or removed using
                // the beforeSend callback:
                options.headers = $.extend(options.headers, {
                    'X-File-Name': file.name,
                    'X-File-Type': file.type,
                    'X-File-Size': file.size
                });
                if (!options.blob) {
                    // Non-chunked non-multipart upload:
                    options.contentType = file.type;
                    options.data = file;
                } else if (!options.multipart) {
                    // Chunked non-multipart upload:
                    options.contentType = 'application/octet-stream';
                    options.data = options.blob;
                }
            }
            if (options.multipart && typeof FormData !== 'undefined') {
                if (options.formData instanceof FormData) {
                    formData = options.formData;
                } else {
                    formData = new FormData();
                    $.each(this._getFormData(options), function (index, field) {
                        formData.append(field.name, field.value);
                    });
                }
                if (options.blob) {
                    formData.append(options.paramName, options.blob);
                } else {
                    $.each(options.files, function (index, file) {
                        // File objects are also Blob instances.
                        // This check allows the tests to run with
                        // dummy objects:
                        if (file instanceof Blob) {
                            formData.append(options.paramName, file);
                        }
                    });
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },
        
        _initIframeSettings: function (options) {
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
        },
        
        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
            } else {
                this._initIframeSettings(options);
            }
        },
        
        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
            }
            if (!options.paramName) {
                options.paramName = options.fileInput.prop('name') ||
                    'files[]';
            }
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type || options.form.prop('method') || '')
                .toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT') {
                options.type = 'POST';
            }
        },
        
        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes = options.uploadedBytes || 0,
                mcs = options.maxChunkSize || fs,
                // Use the Blob methods with the slice implementation
                // according to the W3C Blob API specification:
                slice = file.webkitSlice || file.mozSlice || file.slice,
                upload,
                n,
                jqXHR,
                pipe;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = 'uploadedBytes';
                return this._getXHRPromise(false);
            }
            // n is the number of blobs to upload,
            // calculated via filesize, uploaded bytes and max chunk size:
            n = Math.ceil((fs - ub) / mcs);
            // The chunk upload method accepting the chunk number as parameter:
            upload = function (i) {
                if (!i) {
                    return that._getXHRPromise(true);
                }
                // Upload the blobs in sequential order:
                return upload(i -= 1).pipe(function () {
                    // Clone the options object for each chunk upload:
                    var o = $.extend({}, options);
                    o.blob = slice.call(
                        file,
                        ub + i * mcs,
                        ub + (i + 1) * mcs
                    );
                    // Store the current chunk size, as the blob itself
                    // will be dereferenced after data processing:
                    o.chunkSize = o.blob.size;
                    // Process the upload data (the blob and potential form data):
                    that._initXHRData(o);
                    // Add progress listeners for this chunk upload:
                    that._initProgressListener(o);
                    jqXHR = ($.ajax(o) || that._getXHRPromise(false, o.context))
                        .done(function () {
                            // Create a progress event if upload is done and
                            // no progress event has been invoked for this chunk:
                            if (!o.loaded) {
                                that._onProgress($.Event('progress', {
                                    lengthComputable: true,
                                    loaded: o.chunkSize,
                                    total: o.chunkSize
                                }), o);
                            }
                            options.uploadedBytes = o.uploadedBytes
                                += o.chunkSize;
                        });
                    return jqXHR;
                });
            };
            // Return the piped Promise object, enhanced with an abort method,
            // which is delegated to the jqXHR object of the current upload,
            // and jqXHR callbacks mapped to the equivalent Promise methods:
            pipe = upload(n);
            pipe.abort = function () {
                return jqXHR.abort();
            };
            return this._enhancePromise(pipe);
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
            }
            this._active += 1;
            // Initialize the global progress values:
            this._loaded += data.uploadedBytes || 0;
            this._total += this._getTotal(data.files);
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            if (!this._isXHRUpload(options)) {
                // Create a progress event for each iframe load:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: 1,
                    total: 1
                }), options);
            }
            options.result = result;
            options.textStatus = textStatus;
            options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            options.jqXHR = jqXHR;
            options.textStatus = textStatus;
            options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._loaded -= options.loaded || options.uploadedBytes || 0;
                this._total -= options.total || this._getTotal(options.files);
            }
        },

        _onAlways: function (result, textStatus, jqXHR, errorThrown, options) {
            this._active -= 1;
            options.result = result;
            options.textStatus = textStatus;
            options.jqXHR = jqXHR;
            options.errorThrown = errorThrown;
            this._trigger('always', null, options);
            if (this._active === 0) {
                // The stop callback is triggered when all uploads have
                // been completed, equivalent to the global ajaxStop event:
                this._trigger('stop');
                // Reset the global progress values:
                this._loaded = this._total = 0;
            }
        },

        _onSend: function (e, data) {
            var that = this,
                jqXHR,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function (resolve, args) {
                    that._sending += 1;
                    jqXHR = jqXHR || (
                        (resolve !== false &&
                        that._trigger('send', e, options) !== false &&
                        (that._chunkedUpload(options) || $.ajax(options))) ||
                        that._getXHRPromise(false, options.context, args)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (a1, a2, a3) {
                        that._sending -= 1;
                        if (a3 && a3.done) {
                            that._onAlways(a1, a2, a3, undefined, options);
                        } else {
                            that._onAlways(undefined, a2, a1, a3, options);
                        }
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (!nextSlot.isRejected()) {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    pipe = (this._sequence = this._sequence.pipe(send, send));
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    var args = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(args);
                        }
                        return send(false, args);
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },
        
        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data);
            if (options.singleFileUploads && this._isXHRUpload(options)) {
                $.each(data.files, function (index, file) {
                    var newData = $.extend({}, data, {files: [file]});
                    newData.submit = function () {
                        return that._onSend(e, newData);
                    };
                    return (result = that._trigger('add', e, newData));
                });
                return result;
            } else if (data.files.length) {
                data = $.extend({}, data);
                data.submit = function () {
                    return that._onSend(e, data);
                };
                return this._trigger('add', e, data);
            }
        },
        
        // File Normalization for Gecko 1.9.1 (Firefox 3.5) support:
        _normalizeFile: function (index, file) {
            if (file.name === undefined && file.size === undefined) {
                file.name = file.fileName;
                file.size = file.fileSize;
            }
        },

        _replaceFileInput: function (input) {
            var inputClone = input.clone(true);
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Replace the original file input element in the fileInput
            // collection with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
        },
        
        _onChange: function (e) {
            var that = e.data.fileupload,
                data = {
                    files: $.each($.makeArray(e.target.files), that._normalizeFile),
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            if (!data.files.length) {
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                data.files = [{name: e.target.value.replace(/^.*\\/, '')}];
            }
            // Store the form reference as jQuery data for other event handlers,
            // as the form property is not available after replacing the file input: 
            if (data.form.length) {
                data.fileInput.data('blueimp.fileupload.form', data.form);
            } else {
                data.form = data.fileInput.data('blueimp.fileupload.form');
            }
            if (that.options.replaceFileInput) {
                that._replaceFileInput(data.fileInput);
            }
            if (that._trigger('change', e, data) === false ||
                    that._onAdd(e, data) === false) {
                return false;
            }
        },
        
        _onDrop: function (e) {
            var that = e.data.fileupload,
                dataTransfer = e.dataTransfer = e.originalEvent.dataTransfer,
                data = {
                    files: $.each(
                        $.makeArray(dataTransfer && dataTransfer.files),
                        that._normalizeFile
                    )
                };
            if (that._trigger('drop', e, data) === false ||
                    that._onAdd(e, data) === false) {
                return false;
            }
            e.preventDefault();
        },
        
        _onDragOver: function (e) {
            var that = e.data.fileupload,
                dataTransfer = e.dataTransfer = e.originalEvent.dataTransfer;
            if (that._trigger('dragover', e) === false) {
                return false;
            }
            if (dataTransfer) {
                dataTransfer.dropEffect = dataTransfer.effectAllowed = 'copy';
            }
            e.preventDefault();
        },
        
        _initEventHandlers: function () {
            var ns = this.options.namespace || this.name;
            this.options.dropZone
                .bind('dragover.' + ns, {fileupload: this}, this._onDragOver)
                .bind('drop.' + ns, {fileupload: this}, this._onDrop);
            this.options.fileInput
                .bind('change.' + ns, {fileupload: this}, this._onChange);
        },

        _destroyEventHandlers: function () {
            var ns = this.options.namespace || this.name;
            this.options.dropZone
                .unbind('dragover.' + ns, this._onDragOver)
                .unbind('drop.' + ns, this._onDrop);
            this.options.fileInput
                .unbind('change.' + ns, this._onChange);
        },
        
        _beforeSetOption: function (key, value) {
            this._destroyEventHandlers();
        },
        
        _afterSetOption: function (key, value) {
            var options = this.options;
            if (!options.fileInput) {
                options.fileInput = $();
            }
            if (!options.dropZone) {
                options.dropZone = $();
            }
            this._initEventHandlers();
        },
        
        _setOption: function (key, value) {
            var refresh = $.inArray(key, this._refreshOptionsList) !== -1;
            if (refresh) {
                this._beforeSetOption(key, value);
            }
            $.Widget.prototype._setOption.call(this, key, value);
            if (refresh) {
                this._afterSetOption(key, value);
            }
        },

        _create: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input:file') ?
                    this.element : this.element.find('input:file');
            } else if (!options.fileInput) {
                options.fileInput = $();
            }
            if (!options.dropZone) {
                options.dropZone = $();
            }
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = this._loaded = this._total = 0;
            this._initEventHandlers();
        },
        
        destroy: function () {
            this._destroyEventHandlers();
            $.Widget.prototype.destroy.call(this);
        },

        enable: function () {
            $.Widget.prototype.enable.call(this);
            this._initEventHandlers();
        },
        
        disable: function () {
            this._destroyEventHandlers();
            $.Widget.prototype.disable.call(this);
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            if (!data || this.options.disabled) {
                return;
            }
            data.files = $.each($.makeArray(data.files), this._normalizeFile);
            this._onAdd(null, data);
        },
        
        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                data.files = $.each($.makeArray(data.files), this._normalizeFile);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }
        
    });
    
}(jQuery));/*
 * jQuery Iframe Transport Plugin 1.2.2
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 */

/*jslint unparam: true */
/*global jQuery */

(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts three additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s)
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: a, value: 1}, {name: b, value: 2}]
    $.ajaxTransport('iframe', function (options, originalOptions, jqXHR) {
        if (options.type === 'POST' || options.type === 'GET') {
            var form,
                iframe;
            return {
                send: function (headers, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    // javascript:false as initial iframe src
                    // prevents warning popups on HTTPS in IE6.
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    iframe = $(
                        '<iframe src="javascript:false;" name="iframe-transport-' +
                            (counter += 1) + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones;
                        
                        var getIframeContent = function(event) {
                        	if(event.data) {
                        		var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = event.data;
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length) {// || !response[0].firstChild
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="javascript:false;"></iframe>')
                                    .appendTo(form);
                                form.remove();
                        	}
                        };
                        
                        if (typeof window.addEventListener != 'undefined') {  
                    		window.addEventListener('message', getIframeContent, false);
                    	} else if (typeof window.attachEvent != 'undefined') {  
                    		window.attachEvent('onmessage', getIframeContent);  
                    	}
                        
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                               /* var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="javascript:false;"></iframe>')
                                    .appendTo(form);
                                form.remove();*/
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function () {
                                    $(this).prop('name', options.paramName);
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                $(input).prop('name', clone.prop('name'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo('body');
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', 'javascript'.concat(':false;'));
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, and script:
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe.text();
            },
            'iframe json': function (iframe) {
                return $.parseJSON(iframe);
            },
            'iframe html': function (iframe) {
                return iframe.find('body').html();
            },
            'iframe script': function (iframe) {
                return $.globalEval(iframe.text());
            }
        }
    });

}(jQuery));/*
 * Copyright 2008 Netflix, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* Here's some JavaScript software for implementing OAuth.

   This isn't as useful as you might hope.  OAuth is based around
   allowing tools and websites to talk to each other.  However,
   JavaScript running in web browsers is hampered by security
   restrictions that prevent code running on one website from
   accessing data stored or served on another.

   Before you start hacking, make sure you understand the limitations
   posed by cross-domain XMLHttpRequest.

   On the bright side, some platforms use JavaScript as their
   language, but enable the programmer to access other web sites.
   Examples include Google Gadgets, and Microsoft Vista Sidebar.
   For those platforms, this library should come in handy.
*/

// The HMAC-SHA1 signature method calls b64_hmac_sha1, defined by
// http://pajhome.org.uk/crypt/md5/sha1.js

/* An OAuth message is represented as an object like this:
   {method: "GET", action: "http://server.com/path", parameters: ...}

   The parameters may be either a map {name: value, name2: value2}
   or an Array of name-value pairs [[name, value], [name2, value2]].
   The latter representation is more powerful: it supports parameters
   in a specific sequence, or several parameters with the same name;
   for example [["a", 1], ["b", 2], ["a", 3]].

   Parameter names and values are NOT percent-encoded in an object.
   They must be encoded before transmission and decoded after reception.
   For example, this message object:
   {method: "GET", action: "http://server/path", parameters: {p: "x y"}}
   ... can be transmitted as an HTTP request that begins:
   GET /path?p=x%20y HTTP/1.0
   (This isn't a valid OAuth request, since it lacks a signature etc.)
   Note that the object "x y" is transmitted as x%20y.  To encode
   parameters, you can call OAuth.addToURL, OAuth.formEncode or
   OAuth.getAuthorization.

   This message object model harmonizes with the browser object model for
   input elements of an form, whose value property isn't percent encoded.
   The browser encodes each value before transmitting it. For example,
   see consumer.setInputs in example/consumer.js.
 */

/* This script needs to know what time it is. By default, it uses the local
   clock (new Date), which is apt to be inaccurate in browsers. To do
   better, you can load this script from a URL whose query string contains
   an oauth_timestamp parameter, whose value is a current Unix timestamp.
   For example, when generating the enclosing document using PHP:

   <script src="oauth.js?oauth_timestamp=<?=time()?>" ...

   Another option is to call OAuth.correctTimestamp with a Unix timestamp.
 */

var OAuth; if (OAuth == null) OAuth = {};

OAuth.setProperties = function setProperties(into, from) {
    if (into != null && from != null) {
        for (var key in from) {
            into[key] = from[key];
        }
    }
    return into;
}

OAuth.setProperties(OAuth, // utility functions
{
    percentEncode: function percentEncode(s) {
        if (s == null) {
            return "";
        }
        if (s instanceof Array) {
            var e = "";
            for (var i = 0; i < s.length; ++s) {
                if (e != "") e += '&';
                e += OAuth.percentEncode(s[i]);
            }
            return e;
        }
        s = encodeURIComponent(s);
        // Now replace the values which encodeURIComponent doesn't do
        // encodeURIComponent ignores: - _ . ! ~ * ' ( )
        // OAuth dictates the only ones you can ignore are: - _ . ~
        // Source: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:encodeURIComponent
        s = s.replace(/\!/g, "%21");
        s = s.replace(/\*/g, "%2A");
        s = s.replace(/\'/g, "%27");
        s = s.replace(/\(/g, "%28");
        s = s.replace(/\)/g, "%29");
        return s;
    }
,
    decodePercent: function decodePercent(s) {
        if (s != null) {
            // Handle application/x-www-form-urlencoded, which is defined by
            // http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1
            s = s.replace(/\+/g, " ");
        }
        return decodeURIComponent(s);
    }
,
    /** Convert the given parameters to an Array of name-value pairs. */
    getParameterList: function getParameterList(parameters) {
        if (parameters == null) {
            return [];
        }
        if (typeof parameters != "object") {
            return OAuth.decodeForm(parameters + "");
        }
        if (parameters instanceof Array) {
            return parameters;
        }
        var list = [];
        for (var p in parameters) {
            list.push([p, parameters[p]]);
        }
        return list;
    }
,
    /** Convert the given parameters to a map from name to value. */
    getParameterMap: function getParameterMap(parameters) {
        if (parameters == null) {
            return {};
        }
        if (typeof parameters != "object") {
            return OAuth.getParameterMap(OAuth.decodeForm(parameters + ""));
        }
        if (parameters instanceof Array) {
            var map = {};
            for (var p = 0; p < parameters.length; ++p) {
                var key = parameters[p][0];
                if (map[key] === undefined) { // first value wins
                    map[key] = parameters[p][1];
                }
            }
            return map;
        }
        return parameters;
    }
,
    getParameter: function getParameter(parameters, name) {
        if (parameters instanceof Array) {
            for (var p = 0; p < parameters.length; ++p) {
                if (parameters[p][0] == name) {
                    return parameters[p][1]; // first value wins
                }
            }
        } else {
            return OAuth.getParameterMap(parameters)[name];
        }
        return null;
    }
,
    formEncode: function formEncode(parameters) {
        var form = "";
        var list = OAuth.getParameterList(parameters);
        for (var p = 0; p < list.length; ++p) {
            var value = list[p][1];
            if (value == null) value = "";
            if (form != "") form += '&';
            form += OAuth.percentEncode(list[p][0])
              +'='+ OAuth.percentEncode(value);
        }
        return form;
    }
,
    decodeForm: function decodeForm(form) {
        var list = [];
        var nvps = form.split('&');
        for (var n = 0; n < nvps.length; ++n) {
            var nvp = nvps[n];
            if (nvp == "") {
                continue;
            }
            var equals = nvp.indexOf('=');
            var name;
            var value;
            if (equals < 0) {
                name = OAuth.decodePercent(nvp);
                value = null;
            } else {
                name = OAuth.decodePercent(nvp.substring(0, equals));
                value = OAuth.decodePercent(nvp.substring(equals + 1));
            }
            list.push([name, value]);
        }
        return list;
    }
,
    setParameter: function setParameter(message, name, value) {
        var parameters = message.parameters;
        if (parameters instanceof Array) {
            for (var p = 0; p < parameters.length; ++p) {
                if (parameters[p][0] == name) {
                    if (value === undefined) {
                        parameters.splice(p, 1);
                    } else {
                        parameters[p][1] = value;
                        value = undefined;
                    }
                }
            }
            if (value !== undefined) {
                parameters.push([name, value]);
            }
        } else {
            parameters = OAuth.getParameterMap(parameters);
            parameters[name] = value;
            message.parameters = parameters;
        }
    }
,
    setParameters: function setParameters(message, parameters) {
        var list = OAuth.getParameterList(parameters);
        for (var i = 0; i < list.length; ++i) {
            OAuth.setParameter(message, list[i][0], list[i][1]);
        }
    }
,
    /** Fill in parameters to help construct a request message.
        This function doesn't fill in every parameter.
        The accessor object should be like:
        {consumerKey:'foo', consumerSecret:'bar', accessorSecret:'nurn', token:'krelm', tokenSecret:'blah'}
        The accessorSecret property is optional.
     */
    completeRequest: function completeRequest(message, accessor) {
        if (message.method == null) {
            message.method = "GET";
        }
        var map = OAuth.getParameterMap(message.parameters);
        if (map.oauth_consumer_key == null) {
            OAuth.setParameter(message, "oauth_consumer_key", accessor.consumerKey || "");
        }
        if (map.oauth_token == null && accessor.token != null) {
            OAuth.setParameter(message, "oauth_token", accessor.token);
        }
        if (map.oauth_version == null) {
            OAuth.setParameter(message, "oauth_version", "1.0");
        }
        if (map.oauth_timestamp == null) {
            OAuth.setParameter(message, "oauth_timestamp", OAuth.timestamp());
        }
        if (map.oauth_nonce == null) {
            OAuth.setParameter(message, "oauth_nonce", OAuth.nonce(6));
        }
        OAuth.SignatureMethod.sign(message, accessor);
    }
,
    setTimestampAndNonce: function setTimestampAndNonce(message) {
        OAuth.setParameter(message, "oauth_timestamp", OAuth.timestamp());
        OAuth.setParameter(message, "oauth_nonce", OAuth.nonce(6));
    }
,
    addToURL: function addToURL(url, parameters) {
        newURL = url;
        if (parameters != null) {
            var toAdd = OAuth.formEncode(parameters);
            if (toAdd.length > 0) {
                var q = url.indexOf('?');
                if (q < 0) newURL += '?';
                else       newURL += '&';
                newURL += toAdd;
            }
        }
        return newURL;
    }
,
    /** Construct the value of the Authorization header for an HTTP request. */
    getAuthorizationHeader: function getAuthorizationHeader(realm, parameters) {
        var header = 'OAuth realm="' + OAuth.percentEncode(realm) + '"';
        var list = OAuth.getParameterList(parameters);
        for (var p = 0; p < list.length; ++p) {
            var parameter = list[p];
            var name = parameter[0];
            if (name.indexOf("oauth_") == 0) {
                header += ',' + OAuth.percentEncode(name) + '="' + OAuth.percentEncode(parameter[1]) + '"';
            }
        }
        return header;
    }
,
    /** Correct the time using a parameter from the URL from which the last script was loaded. */
    correctTimestampFromSrc: function correctTimestampFromSrc(parameterName) {
        parameterName = parameterName || "oauth_timestamp";
        var scripts = document.getElementsByTagName('script');
        if (scripts == null || !scripts.length) return;
        var src = scripts[scripts.length-1].src;
        if (!src) return;
        var q = src.indexOf("?");
        if (q < 0) return;
        parameters = OAuth.getParameterMap(OAuth.decodeForm(src.substring(q+1)));
        var t = parameters[parameterName];
        if (t == null) return;
        OAuth.correctTimestamp(t);
    }
,
    /** Generate timestamps starting with the given value. */
    correctTimestamp: function correctTimestamp(timestamp) {
        OAuth.timeCorrectionMsec = (timestamp * 1000) - (new Date()).getTime();
    }
,
    /** The difference between the correct time and my clock. */
    timeCorrectionMsec: 0
,
    timestamp: function timestamp() {
        var t = (new Date()).getTime() + OAuth.timeCorrectionMsec;
        return Math.floor(t / 1000);
    }
,
    nonce: function nonce(length) {
        var chars = OAuth.nonce.CHARS;
        var result = "";
        for (var i = 0; i < length; ++i) {
            var rnum = Math.floor(Math.random() * chars.length);
            result += chars.substring(rnum, rnum+1);
        }
        return result;
    }
});

OAuth.nonce.CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

/** Define a constructor function,
    without causing trouble to anyone who was using it as a namespace.
    That is, if parent[name] already existed and had properties,
    copy those properties into the new constructor.
 */
OAuth.declareClass = function declareClass(parent, name, newConstructor) {
    var previous = parent[name];
    parent[name] = newConstructor;
    if (newConstructor != null && previous != null) {
        for (var key in previous) {
            if (key != "prototype") {
                newConstructor[key] = previous[key];
            }
        }
    }
    return newConstructor;
}

/** An abstract algorithm for signing messages. */
OAuth.declareClass(OAuth, "SignatureMethod", function OAuthSignatureMethod(){});

OAuth.setProperties(OAuth.SignatureMethod.prototype, // instance members
{
    /** Add a signature to the message. */
    sign: function sign(message) {
        var baseString = OAuth.SignatureMethod.getBaseString(message);
        var signature = this.getSignature(baseString);
        OAuth.setParameter(message, "oauth_signature", signature);
        return signature; // just in case someone's interested
    }
,
    /** Set the key string for signing. */
    initialize: function initialize(name, accessor) {
        var consumerSecret;
        if (accessor.accessorSecret != null
            && name.length > 9
            && name.substring(name.length-9) == "-Accessor")
        {
            consumerSecret = accessor.accessorSecret;
        } else {
            consumerSecret = accessor.consumerSecret;
        }
        this.key = OAuth.percentEncode(consumerSecret)
             +"&"+ OAuth.percentEncode(accessor.tokenSecret);
    }
});

/* SignatureMethod expects an accessor object to be like this:
   {tokenSecret: "lakjsdflkj...", consumerSecret: "QOUEWRI..", accessorSecret: "xcmvzc..."}
   The accessorSecret property is optional.
 */
// Class members:
OAuth.setProperties(OAuth.SignatureMethod, // class members
{
    sign: function sign(message, accessor) {
        var name = OAuth.getParameterMap(message.parameters).oauth_signature_method;
        if (name == null || name == "") {
            name = "HMAC-SHA1";
            OAuth.setParameter(message, "oauth_signature_method", name);
        }
        OAuth.SignatureMethod.newMethod(name, accessor).sign(message);
    }
,
    /** Instantiate a SignatureMethod for the given method name. */
    newMethod: function newMethod(name, accessor) {
        var impl = OAuth.SignatureMethod.REGISTERED[name];
        if (impl != null) {
            var method = new impl();
            method.initialize(name, accessor);
            return method;
        }
        var err = new Error("signature_method_rejected");
        var acceptable = "";
        for (var r in OAuth.SignatureMethod.REGISTERED) {
            if (acceptable != "") acceptable += '&';
            acceptable += OAuth.percentEncode(r);
        }
        err.oauth_acceptable_signature_methods = acceptable;
        throw err;
    }
,
    /** A map from signature method name to constructor. */
    REGISTERED : {}
,
    /** Subsequently, the given constructor will be used for the named methods.
        The constructor will be called with no parameters.
        The resulting object should usually implement getSignature(baseString).
        You can easily define such a constructor by calling makeSubclass, below.
     */
    registerMethodClass: function registerMethodClass(names, classConstructor) {
        for (var n = 0; n < names.length; ++n) {
            OAuth.SignatureMethod.REGISTERED[names[n]] = classConstructor;
        }
    }
,
    /** Create a subclass of OAuth.SignatureMethod, with the given getSignature function. */
    makeSubclass: function makeSubclass(getSignatureFunction) {
        var superClass = OAuth.SignatureMethod;
        var subClass = function() {
            superClass.call(this);
        };
        subClass.prototype = new superClass();
        // Delete instance variables from prototype:
        // delete subclass.prototype... There aren't any.
        subClass.prototype.getSignature = getSignatureFunction;
        subClass.prototype.constructor = subClass;
        return subClass;
    }
,
    getBaseString: function getBaseString(message) {
        var URL = message.action;
        var q = URL.indexOf('?');
        var parameters;
        if (q < 0) {
            parameters = message.parameters;
        } else {
            // Combine the URL query string with the other parameters:
            parameters = OAuth.decodeForm(URL.substring(q + 1));
            var toAdd = OAuth.getParameterList(message.parameters);
            for (var a = 0; a < toAdd.length; ++a) {
                parameters.push(toAdd[a]);
            }
        }
        return OAuth.percentEncode(message.method.toUpperCase())
         +'&'+ OAuth.percentEncode(OAuth.SignatureMethod.normalizeUrl(URL))
         +'&'+ OAuth.percentEncode(OAuth.SignatureMethod.normalizeParameters(parameters));
    }
,
    normalizeUrl: function normalizeUrl(url) {
        var uri = OAuth.SignatureMethod.parseUri(url);
        var scheme = uri.protocol.toLowerCase();
        var authority = uri.authority.toLowerCase();
        var dropPort = (scheme == "http" && uri.port == 80)
                    || (scheme == "https" && uri.port == 443);
        if (dropPort) {
            // find the last : in the authority
            var index = authority.lastIndexOf(":");
            if (index >= 0) {
                authority = authority.substring(0, index);
            }
        }
        var path = uri.path;
        if (!path) {
            path = "/"; // conforms to RFC 2616 section 3.2.2
        }
        // we know that there is no query and no fragment here.
        return scheme + "://" + authority + path;
    }
,
    parseUri: function parseUri (str) {
        /* This function was adapted from parseUri 1.2.1
           http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
         */
        var o = {key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
                 parser: {strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/ }};
        var m = o.parser.strict.exec(str);
        var uri = {};
        var i = 14;
        while (i--) uri[o.key[i]] = m[i] || "";
        return uri;
    }
,
    normalizeParameters: function normalizeParameters(parameters) {
        if (parameters == null) {
            return "";
        }
        var list = OAuth.getParameterList(parameters);
        var sortable = [];
        for (var p = 0; p < list.length; ++p) {
            var nvp = list[p];
            if (nvp[0] != "oauth_signature") {
                sortable.push([ OAuth.percentEncode(nvp[0])
                              + " " // because it comes before any character that can appear in a percentEncoded string.
                              + OAuth.percentEncode(nvp[1])
                              , nvp]);
            }
        }
        sortable.sort(function(a,b) {
                          if (a[0] < b[0]) return  -1;
                          if (a[0] > b[0]) return 1;
                          return 0;
                      });
        var sorted = [];
        for (var s = 0; s < sortable.length; ++s) {
            sorted.push(sortable[s][1]);
        }
        return OAuth.formEncode(sorted);
    }
});

OAuth.SignatureMethod.registerMethodClass(["PLAINTEXT", "PLAINTEXT-Accessor"],
    OAuth.SignatureMethod.makeSubclass(
        function getSignature(baseString) {
            return this.key;
        }
    ));

OAuth.SignatureMethod.registerMethodClass(["HMAC-SHA1", "HMAC-SHA1-Accessor"],
    OAuth.SignatureMethod.makeSubclass(
        function getSignature(baseString) {
            b64pad = '=';
            var signature = b64_hmac_sha1(this.key, baseString);
            return signature;
        }
    ));

try {
    OAuth.correctTimestampFromSrc();
} catch(e) {
}
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length * chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length * chrsz));}
function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}
function str_hmac_sha1(key, data){ return binb2str(core_hmac_sha1(key, data));}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data)
{
  var bkey = str2binb(key);
  if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
  return core_sha1(opad.concat(hash), 512 + 160);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  return bin;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (32 - chrsz - i%32)) & mask);
  return str;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
var com;
if (!com) com = {};
if (!com.cocoafish) com.cocoafish = {};
if (!com.cocoafish.constants) com.cocoafish.constants = {};
if (!com.cocoafish.js) com.cocoafish.js = {};
if (!com.cocoafish.js.sdk) com.cocoafish.js.sdk = {};
if (!com.cocoafish.js.sdk.utils) com.cocoafish.js.sdk.utils = {};

if (!com.cocoafish.sdk) com.cocoafish.sdk = {};
if (!com.cocoafish.sdk.url) com.cocoafish.sdk.url = {};//REST APIs

//Protocols
com.cocoafish.sdk.url.http = 'http://';
com.cocoafish.sdk.url.https = 'https://';

//URL
com.cocoafish.sdk.url.baseURL = 'api.cloud.appcelerator.com';
com.cocoafish.sdk.url.authBaseURL = 'secure-identity.cloud.appcelerator.com';
com.cocoafish.sdk.url.version = 'v1';

//HTTP methods
com.cocoafish.constants.get_method = 'GET';
com.cocoafish.constants.post_method = 'POST';
com.cocoafish.constants.put_method = 'PUT';
com.cocoafish.constants.delete_method = 'DELETE';

//Authentication Types
com.cocoafish.constants.app_key = 1;
com.cocoafish.constants.oauth = 2;
com.cocoafish.constants.three_legged_oauth = 3;
com.cocoafish.constants.unknown = -1;

//Others
com.cocoafish.constants.keyParam = '?key=';
com.cocoafish.constants.oauthKeyParam = '?oauth_consumer_key=';
com.cocoafish.constants.clientIdParam = '?client_id=';
com.cocoafish.constants.redirectUriParam = '&redirect_uri=';
com.cocoafish.constants.responseTypeParam = '&response_type=';
com.cocoafish.constants.accessToken = 'access_token';
com.cocoafish.constants.expiresIn = 'expires_in';
com.cocoafish.constants.appKey = 'app_key';
com.cocoafish.constants.json='json';
com.cocoafish.constants.sessionId = '_session_id';
com.cocoafish.constants.sessionCookieName = 'Cookie';
com.cocoafish.constants.responseCookieName = 'Set-Cookie';
com.cocoafish.constants.ie = 'MSIE';
com.cocoafish.constants.ie_v7 = 7;
com.cocoafish.constants.file = 'file';
com.cocoafish.constants.userId = 'user_id';
com.cocoafish.constants.placeId = 'place_id';
com.cocoafish.constants.suppressCode = 'suppress_response_codes';
com.cocoafish.constants.response_wrapper = 'response_wrapper';
com.cocoafish.constants.ie_post_message = 'ie_post_message';
com.cocoafish.constants.photo = 'photo';
com.cocoafish.constants.method = '_method';
com.cocoafish.constants.name = 'name';
com.cocoafish.constants.value = 'value';
com.cocoafish.constants.oauth_header = 'Authorization';
com.cocoafish.constants.noAppKeyError = {'meta' : {'status': 'fail', 'code': 409, 'message': 'Application key is not provided.'}};
com.cocoafish.constants.fileLoadError = {'meta' : {'status': 'fail', 'code': 400, 'message': 'Unable to load file'}};
com.cocoafish.constants.invalidArgumentError = {'meta' : {'status': 'fail', 'code': 400, 'message': 'Invalid number of arguments, expecting at least 4 arguments.'}};

//Appcelerator
com.cocoafish.constants.appcelerator = 'Appcelerator';
com.cocoafish.js.sdk.utils.getSessionParams = function() {
	var sessionParam = null;
	var sessionId = com.cocoafish.js.sdk.utils.getCookie(com.cocoafish.constants.sessionId);
	if (sessionId) {
		sessionParam = com.cocoafish.constants.sessionId + '=' + sessionId;
	}
	return sessionParam;
};

com.cocoafish.js.sdk.utils.trim = function(str) {
	if(str)
		return str.replace(/(^\s*)(\s*$)/g, '');
	return '';
};

com.cocoafish.js.sdk.utils.checkAppcelerator = function() {
	try {
		Titanium.userAgent;
		return true;
	} catch(e) {
		return false;
	}
};

com.cocoafish.js.sdk.utils.BrowserDetect = 
{
		init: function () {
			if (com.cocoafish.js.sdk.utils.checkAppcelerator()) {
				this.browser = com.cocoafish.constants.appcelerator;
				agent = Titanium.userAgent;
				if(agent) {
					v = agent.substring(agent.indexOf("/")+1, agent.indexOf("("));
					osStr = agent.substring(agent.indexOf("(") + 1, agent.indexOf(")"));
					var info = osStr.split(";");
					if(v) {
						this.version = com.cocoafish.js.sdk.utils.trim(v);
					}
					if(info && info.length > 2) {
						this.OS = com.cocoafish.js.sdk.utils.trim(info[1]);
					}
				}
			} else {
				this.dataBrowser = [
					{
						string: navigator.userAgent,
						subString: "Chrome",
						identity: "Chrome"
					},
					{ 	string: navigator.userAgent,
						subString: "OmniWeb",
						versionSearch: "OmniWeb/",
						identity: "OmniWeb"
					},
					{
						string: navigator.vendor,
						subString: "Apple",
						identity: "Safari",
						versionSearch: "Version"
					},
					{
						prop: window.opera,
						identity: "Opera"
					},
					{
						string: navigator.vendor,
						subString: "iCab",
						identity: "iCab"
					},
					{
						string: navigator.vendor,
						subString: "KDE",
						identity: "Konqueror"
					},
					{
						string: navigator.userAgent,
						subString: "Firefox",
						identity: "Firefox"
					},
					{
						string: navigator.vendor,
						subString: "Camino",
						identity: "Camino"
					},
					{		// for newer Netscapes (6+)
						string: navigator.userAgent,
						subString: "Netscape",
						identity: "Netscape"
					},
					{
						string: navigator.userAgent,
						subString: "MSIE",
						identity: "MSIE",
						versionSearch: "MSIE"
					},
					{
						string: navigator.userAgent,
						subString: "Gecko",
						identity: "Mozilla",
						versionSearch: "rv"
					},
					{ 		// for older Netscapes (4-)
						string: navigator.userAgent,
						subString: "Mozilla",
						identity: "Netscape",
						versionSearch: "Mozilla"
					}
				];
				this.dataOS = [
					{
						string: navigator.platform,
						subString: "Win",
						identity: "Windows"
					},
					{
						string: navigator.platform,
						subString: "Mac",
						identity: "Mac"
					},
					{
						   string: navigator.userAgent,
						   subString: "iPhone",
						   identity: "iPhone/iPod"
				    },
					{
						string: navigator.platform,
						subString: "Linux",
						identity: "Linux"
					}
				];
				this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
				this.version = this.searchVersion(navigator.userAgent)
					|| this.searchVersion(navigator.appVersion)
					|| "an unknown version";
				this.OS = this.searchString(this.dataOS) || "an unknown OS";
			}
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		}
};
com.cocoafish.js.sdk.utils.BrowserDetect.init();

com.cocoafish.js.sdk.utils.getCookie = function( name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f
	var i = '';
	
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
		
		
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	
		// if the extracted name matches passed name
		if ( cookie_name == name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found ) 
	{
		return null;
	}
};

/*
only the first 2 parameters are required, the cookie name, the cookie
value. Cookie time is in milliseconds, so the below expires will make the 
number you pass in the Set_Cookie function call the number of days the cookie
lasts, if you want it to be hours or minutes, just get rid of 24 and 60.

Generally you don't need to worry about domain, path or secure for most applications
so unless you need that, leave those parameters blank in the function call.
*/
com.cocoafish.js.sdk.utils.setCookie = function( name, value, expires, path, domain, secure ) {
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	// if the expires variable is set, make the correct expires time, the
	// current script below will set it for x number of days, to make it
	// for hours, delete * 24, for minutes, delete * 60 * 24
	if ( expires )
	{
		expires = expires * 1000 * 60 * 60 * 24;
	}
	//alert( 'today ' + today.toGMTString() );// this is for testing purpose only
	var expires_date = new Date( today.getTime() + (expires) );
	//alert('expires ' + expires_date.toGMTString());// this is for testing purposes only

	document.cookie = name + "=" + escape( value ) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + //expires.toGMTString()
		( ( path ) ? ";path=" + path : "" ) + 
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
};

com.cocoafish.js.sdk.utils.deleteCookie = function( name, path, domain ) {
	if ( com.cocoafish.js.sdk.utils.getCookie( name ) ) document.cookie = name + "=" +
			( ( path ) ? ";path=" + path : "") +
			( ( domain ) ? ";domain=" + domain : "" ) +
			";expires=Thu, 01-Jan-1970 00:00:01 GMT";
};

com.cocoafish.js.sdk.utils.getAuthType = function(obj) {
	if(obj) {
        if(obj.isThreeLegged()) {
            return com.cocoafish.constants.three_legged_oauth;
        } else if(obj.appKey) {
			return com.cocoafish.constants.app_key;
		} else if (obj.oauthKey && obj.oauthSecret) {
			return com.cocoafish.constants.oauth;
		}
	}
	return com.cocoafish.constants.unknown;
};

com.cocoafish.js.sdk.utils.prepareFormData = function(data) {
	if(window.FormData) {
		var formData = new FormData();
		if(data) {
			for (prop in data) {
			    if (!data.hasOwnProperty(prop)) {
			        continue;
			    }
			    if(prop == com.cocoafish.constants.photo || prop == com.cocoafish.constants.file) {
			    	var fileInputId = data[prop];
			    	var fileInput = document.getElementById(fileInputId);
					if(fileInput && fileInput.files[0]) {
						formData.append(prop, fileInput.files[0]);
					}
			    } else {
			    	formData.append(prop, data[prop]);
			    }
			}
		}
		return formData;
	}
};

com.cocoafish.js.sdk.utils.prepareFormDataArray = function(data) {
	var formDataArray = new Array();
	if(data) {
		for (prop in data) {
		    if (!data.hasOwnProperty(prop)) {
		        continue;
		    }
		    if(prop != com.cocoafish.constants.photo && prop != com.cocoafish.constants.file) {
		    	var object = new Object();
		    	object[com.cocoafish.constants.name] = prop;
		    	object[com.cocoafish.constants.value] = data[prop];
		    	formDataArray.push(object);
		    }
		}
	}
	return formDataArray;
};

com.cocoafish.js.sdk.utils.getFileObject = function(data) {
	if(data) {
		for (prop in data) {
		    if (!data.hasOwnProperty(prop)) {
		        continue;
		    }
		    if(prop == com.cocoafish.constants.photo || prop == com.cocoafish.constants.file) {
		    	if(com.cocoafish.js.sdk.utils.BrowserDetect.browser == com.cocoafish.constants.appcelerator) {
		    		return data[prop];
		    	} else {
			    	var fileInputId = data[prop];
			    	var fileInput = $('#' + fileInputId);
					return fileInput;
				}
		    }
		}
	}
	return null;
};

com.cocoafish.js.sdk.utils.cleanInvalidData = function(data) {
	if(data) {
		for (prop in data) {
		    if (!data.hasOwnProperty(prop)) {
		        continue;
		    }
		    if (data[prop] == null) {
		    	delete data[prop];
		    }
		}
		return data;
	} else {
		return {};
	}
};

com.cocoafish.js.sdk.utils.uploadMessageCallback = function(event) {
	if(event && event.data) {
		return $.parseJSON(event.data);
	} else {
		return {};
	}
};

com.cocoafish.js.sdk.utils.getOAuthParameters = function(parameters) {
	var urlParameters = '';
	if(parameters) {
	    var list = OAuth.getParameterList(parameters);
	    for (var p = 0; p < list.length; ++p) {
	        var parameter = list[p];
	        var name = parameter[0];
	        if (name.indexOf("oauth_") == 0 && name != "oauth_token") {
	        	urlParameters += '&' + OAuth.percentEncode(name) + '=' + OAuth.percentEncode(parameter[1]);
	        }
	    }
	}
	if(urlParameters.length > 0) {
		urlParameters = urlParameters.substring(1);
	}
	return urlParameters;
};

com.cocoafish.js.sdk.utils.populateOAuthParameters = function(parameters, oauthKey) {
	if (parameters && oauthKey) {
		parameters.push(["oauth_version", "1.0"]);
		parameters.push(["oauth_consumer_key", oauthKey]);
		parameters.push(["oauth_signature_method", "HMAC-SHA1"]);
		parameters.push(["oauth_nonce", OAuth.nonce(15)]);
	}
};

com.cocoafish.js.sdk.utils.sendAppceleratorRequest = function(url, method, data, header, callback, sdk) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(60000);
	
	xhr.onerror = function(e) {
		var json = this.responseText;
		var data = JSON.parse(json);
		if(data && data.meta) {
			data.metaString = JSON.stringify(data.meta);
		}
		callback(data);
	};
	
	xhr.onload = function(e) {
		var json = this.responseText;
		var data = JSON.parse(json);
		if(data && data.meta) {
			data.metaString = JSON.stringify(data.meta);
			if(data.meta.session_id) {
				var sessionId = data.meta.session_id;
				com.cocoafish.js.sdk.utils.setCookie(com.cocoafish.constants.sessionId, sessionId);
				sdk.session_id = sessionId;
			}
		}
		callback(data);
	};

	// for GET request only
	var requestURL = url;
	if(method.toUpperCase() == com.cocoafish.constants.get_method) {
		if(data) {
			var params = '';
			for (prop in data) {
				if (!data.hasOwnProperty(prop)) {
					continue;
				}
				params += '&' + prop + '=' + data[prop];
 			}
 			if(params.length > 0) {
 				if(url.indexOf('?') > 0) {
 					requestURL += params;
 				} else {
 					requestURL += '?' + params.substring(1);
 				}
 				data = {};
 			}
		}
	}

	// open the client
	xhr.open(method, requestURL);

	// set headers
	if(header) {
		for (prop in header) {
			if (!header.hasOwnProperty(prop)) {
				continue;
			}
			xhr.setRequestHeader(prop, header[prop]);
		}
	}
	// send the data
	xhr.send(data);
};

/**
 * Encode parameters to a query string.
 *
 * @access private
 * @param   params {Object}  the parameters to encode
 * @param   sep    {String}  the separator string (defaults to '&')
 * @param   encode {Boolean} indicate if the key/value should be URI encoded
 * @return        {String}  the query string
 */
com.cocoafish.js.sdk.utils.encodeQS = function(params, sep, encode) {
    sep    = sep === undefined ? '&' : sep;
    encode = encode === false ? function(s) { return s; } : encodeURIComponent;

    var pairs = [];
    com.cocoafish.js.sdk.utils.forEach(params, function(val, key) {
        if (val !== null && typeof val != 'undefined') {
            pairs.push(encode(key) + '=' + encode(val));
        }
    });
    pairs.sort();
    return pairs.join(sep);
};

/**
 * Decode a query string into a parameters object.
 *
 * @access private
 * @param   str {String} the query string
 * @return     {Object} the parameters to encode
 */
com.cocoafish.js.sdk.utils.decodeQS = function(str) {
    var
        decode = decodeURIComponent,
        params = {},
        parts  = str.split('&'),
        i,
        pair;

    for (i=0; i<parts.length; i++) {
        pair = parts[i].split('=', 2);
        if (pair && pair[0]) {
            params[decode(pair[0])] = decode(pair[1]);
        }
    }

    return params;
};


/**
 * Generates a weak random ID.
 *
 * @access private
 * @return {String} a random ID
 */
com.cocoafish.js.sdk.utils.guid = function() {
    return 'f' + (Math.random() * (1<<30)).toString(16).replace('.', '');
};

/**
 * Copies things from source into target.
 *
 * @access private
 * @param target    {Object}  the target object where things will be copied
 *                            into
 * @param source    {Object}  the source object where things will be copied
 *                            from
 * @param overwrite {Boolean} indicate if existing items should be
 *                            overwritten
 * @param tranform  {function} [Optional], transformation function for
 *        each item
 */
com.cocoafish.js.sdk.utils.copy = function(target, source, overwrite, transform) {
  for (var key in source) {
    if (overwrite || typeof target[key] === 'undefined') {
      target[key] = transform ? transform(source[key]) :  source[key];
    }
  }
  return target;
};


  /**
   * For looping through Arrays and Objects.
   *
   * @param {Object} item   an Array or an Object
   * @param {Function} fn   the callback function for iteration.
   *    The function will be pass (value, [index/key], item) paramters
   * @param {Bool} proto  indicate if properties from the prototype should
   *                      be included
   *
   */
com.cocoafish.js.sdk.utils.forEach = function(item, fn, proto) {
    if (!item) {
      return;
    }

    if (Object.prototype.toString.apply(item) === '[object Array]' ||
        (!(item instanceof Function) && typeof item.length == 'number')) {
      if (item.forEach) {
        item.forEach(fn);
      } else {
        for (var i=0, l=item.length; i<l; i++) {
          fn(item[i], i, item);
        }
      }
    } else {
      for (var key in item) {
        if (proto || item.hasOwnProperty(key)) {
          fn(item[key], key, item);
        }
      }
    }
};

//if you want to use three-legged OAuth, always pass OAuth key to the key argument
function Cocoafish(key, secret, baseURL, authBaseURL, redirect_uri) {
	
	//a flag indicating whether 3-legged oauth will be used
	var threeLegged = false;
	
	//two UI modes: CURRENT and POPUP
	//CURRENT means to use current window do display pages from Authorization Server
	//POPUP means to use popup window or iframe to connect to authorization server
	//var uiMode = 'CURRENT';
	var uiMode = 'POPUP';
	
	if (!secret) {
		this.appKey = key;
	} else {
		this.oauthKey = key;
		this.oauthSecret = secret;
	}
	if (baseURL) {
		this.apiBaseURL = baseURL;
	} else {
		this.apiBaseURL = com.cocoafish.sdk.url.baseURL;
	}
	if (authBaseURL) {
		this.authBaseURL = authBaseURL;
	} else {
		this.authBaseURL = com.cocoafish.sdk.url.authBaseURL;
	}
	//if not passed in it could be set explicitly
	if (redirect_uri) {
		this.redirectUri = redirect_uri;
	}

	this.useThreeLegged = function(isThreeLegged) {
		threeLegged = isThreeLegged;
		if(!this.oauthKey) //If three-legged OAuth is used the passed in 'key' should be OAuth key 
			this.oauthKey = this.appKey;
	};
	
	this.isThreeLegged = function() {
		return threeLegged;
	};

	this.setUIMode = function(mode) {
		uiMode = mode;
	};
		  
	this.getUIMode = function() {
	  	return uiMode;
	};
	
	return this;
}

Cocoafish.prototype.sendRequest = function(url, method, data, callback, useSecure) {
	var authType = com.cocoafish.js.sdk.utils.getAuthType(this);
	if(authType == com.cocoafish.constants.unknown) {
		callback(com.cocoafish.constants.noAppKeyError);
		return;
	}
	
	var isSecure = true;
	if(arguments.length == 4) {
		isSecure = true;
	} else if(arguments.length == 5) {
		if(typeof(callback) == 'boolean') {
			isSecure = callback;
			callback = useSecure;
		} else {
			isSecure = useSecure;
		}
	} else {
		callback(com.cocoafish.constants.invalidArgumentError);
		return;
	}
	
	//build request url
	var reqURL = '';
	if(isSecure) {
		reqURL += com.cocoafish.sdk.url.https;
	} else {
		reqURL += com.cocoafish.sdk.url.http;
	}
	reqURL += this.apiBaseURL + "/" + com.cocoafish.sdk.url.version + "/" + url;
	
	if(authType == com.cocoafish.constants.app_key) {
		reqURL += com.cocoafish.constants.keyParam + this.appKey;
	} else {
		//For both 2-legged and 3-legged oauth there should be an OAuth key
        //For IE oauth parameters will be added to URL anyway
        if(com.cocoafish.js.sdk.utils.BrowserDetect.browser != com.cocoafish.constants.ie) {
            reqURL += com.cocoafish.constants.oauthKeyParam + this.oauthKey;
        }
	}
	
	//Search for session id and save it into cookie
	var sdk_obj = this;
	var serverCallback = function(responseData, responseStatus, requestObj) {
		if(responseData && responseData.meta && responseData.meta.session_id) {
			var sessionId = responseData.meta.session_id;
			com.cocoafish.js.sdk.utils.setCookie(com.cocoafish.constants.sessionId, sessionId);
			sdk_obj.session_id = sessionId;
		}
		callback(responseData);
	}
	
	if(data == null)
		data = {};
	
	var apiMethod = method ? method.toUpperCase() : com.cocoafish.constants.get_method;
	if(com.cocoafish.js.sdk.utils.BrowserDetect.browser == com.cocoafish.constants.ie) {
		if(apiMethod == com.cocoafish.constants.put_method || apiMethod == com.cocoafish.constants.delete_method) {
			data[com.cocoafish.constants.method] = apiMethod;
			apiMethod = com.cocoafish.constants.post_method;
		}
	}
	
	data[com.cocoafish.constants.suppressCode] = 'true';
    if(!this.isThreeLegged()) {
        var sessionId = com.cocoafish.js.sdk.utils.getCookie(com.cocoafish.constants.sessionId);
        if (!sessionId)
            sessionId = this.session_id;

        if (sessionId) {
            if(reqURL.indexOf("?") != -1) {
                reqURL += "&" + com.cocoafish.constants.sessionId + '=' + sessionId;
            } else {
                reqURL += "?" + com.cocoafish.constants.sessionId + '=' + sessionId;
            }
        }
    }

    if(this.isThreeLegged()) {
            if(!this.accessToken) {
                var session = this.getSession();
                if(session) {
                    this.accessToken = session.access_token;;
                }
            }

            //alert('sendRequest -> url: ' + url + ' access token: ' + this.accessToken);
            if(this.accessToken) {
            	data[com.cocoafish.constants.accessToken] = this.accessToken;
            }
    }

	data = com.cocoafish.js.sdk.utils.cleanInvalidData(data);
	
	var fileInputObj = com.cocoafish.js.sdk.utils.getFileObject(data);
	if(fileInputObj) {
		//send request with file
		if(com.cocoafish.js.sdk.utils.BrowserDetect.browser == com.cocoafish.constants.ie) {
			//IE8+
			var formDataArray = com.cocoafish.js.sdk.utils.prepareFormDataArray(data);
			var suppressCode = {name: com.cocoafish.constants.suppressCode, value: true};
			formDataArray.push(suppressCode);
			
			var wrapperValue = com.cocoafish.constants.ie_post_message;
			/*
			//for IE7 only
			if(com.cocoafish.js.sdk.utils.BrowserDetect.version == com.cocoafish.constants.ie_v7) {	
				wrapperValue = com.cocoafish.constants.ie_document_domain;
			}
			*/
			var responseWrapper = {name: com.cocoafish.constants.response_wrapper, value: wrapperValue};
			formDataArray.push(responseWrapper);
			
			//oauth
			var header = {};
			if((authType == com.cocoafish.constants.oauth || authType == com.cocoafish.constants.three_legged_oauth)) {
				var message = { 
					method: apiMethod,
					action: reqURL,
					parameters: []
				};
				com.cocoafish.js.sdk.utils.populateOAuthParameters(message.parameters, this.oauthKey);
				if(this.oauthSecret) {
					OAuth.completeRequest(message, {consumerSecret: this.oauthSecret});
				}
				
				var oauthParams = com.cocoafish.js.sdk.utils.getOAuthParameters(message.parameters);
				if(oauthParams && reqURL.indexOf("?") != -1) {
					reqURL += "&" + oauthParams;
				} else {
					reqURL += "?" + oauthParams;
				}
			}
			
			var fileUploadObject = fileInputObj.fileupload({
		        dataType: com.cocoafish.constants.json,
		        url: reqURL,
		        headers: header,
		        formData: function(form) {
		        	return formDataArray;
		        },
		        done: function (e, data) {
		            callback(data.result);
		        }
		    });
			
			var fieldName = '';
			if(data.file) {
				fieldName = com.cocoafish.constants.file;
			} else if(data.photo) {
				fieldName = com.cocoafish.constants.photo;
			}
			fileInputObj.prop(com.cocoafish.constants.name, fieldName);
			
			fileUploadObject.fileupload('send', {files:[{name:fieldName}]});
		} else if(com.cocoafish.js.sdk.utils.BrowserDetect.browser == com.cocoafish.constants.appcelerator) {
			if(fileInputObj) {
				try {
					var binary;
					if(fileInputObj.toString().match(/TiFilesystemFile/)) {
						binary = fileInputObj.read();
					} else {
						binary = fileInputObj;
					}
					
					if (!binary) {
						callback(com.cocoafish.constants.fileLoadError);
						return;
					}
					
					if(data[com.cocoafish.constants.file]) {
						delete data[com.cocoafish.constants.file];
						data[com.cocoafish.constants.file] = binary;
					} else if(data[com.cocoafish.constants.photo]) {
						delete data[com.cocoafish.constants.photo];
						data[com.cocoafish.constants.photo] = binary;
					}
				} catch(e) {
					callback(com.cocoafish.constants.fileLoadError);
					return;
				}
				
				var header = {};
				if((authType == com.cocoafish.constants.oauth || authType == com.cocoafish.constants.three_legged_oauth)) {
					var message = { 
						method: apiMethod,
						action: reqURL,
						parameters: []
					};
					com.cocoafish.js.sdk.utils.populateOAuthParameters(message.parameters, this.oauthKey);
					if(this.oauthSecret) {
						OAuth.completeRequest(message, {consumerSecret: this.oauthSecret});
					}
					header[com.cocoafish.constants.oauth_header] = OAuth.getAuthorizationHeader("", message.parameters);
				}
				//send request
				com.cocoafish.js.sdk.utils.sendAppceleratorRequest(reqURL, apiMethod, data, header, callback, this);
			} else {
				callback(com.cocoafish.constants.fileLoadError);
			}
		} else {
			//other browsers
			var formData = com.cocoafish.js.sdk.utils.prepareFormData(data);
			formData.append(com.cocoafish.constants.suppressCode, true);
			
			//oauth
			var header = {};
			if((authType == com.cocoafish.constants.oauth || authType == com.cocoafish.constants.three_legged_oauth)) {
				var message = { 
					method: apiMethod,
					action: reqURL,
					parameters: []
				};
				com.cocoafish.js.sdk.utils.populateOAuthParameters(message.parameters, this.oauthKey);
				if(this.oauthSecret) {
					OAuth.completeRequest(message, {consumerSecret: this.oauthSecret});
				}
				header[com.cocoafish.constants.oauth_header] = OAuth.getAuthorizationHeader("", message.parameters);
			}
			
			$.postCORSWithFile(reqURL, formData, serverCallback, com.cocoafish.constants.json, header, {withCredentials: true});
		}
	} else {
		//send request without file
		var header = {};
		if((authType == com.cocoafish.constants.oauth || authType == com.cocoafish.constants.three_legged_oauth)) {
			var message = { 
				method: apiMethod,
				action: reqURL,
				parameters: []
			};
			for (prop in data) {
				if (!data.hasOwnProperty(prop)) {
					continue;
				}
				message.parameters.push([prop, data[prop]]);
			}
			com.cocoafish.js.sdk.utils.populateOAuthParameters(message.parameters, this.oauthKey);
			if(this.oauthSecret) {
				OAuth.completeRequest(message, {consumerSecret: this.oauthSecret});
			}
			
			if(com.cocoafish.js.sdk.utils.BrowserDetect.browser == com.cocoafish.constants.ie) {
				var oauthParams = com.cocoafish.js.sdk.utils.getOAuthParameters(message.parameters);
				if(oauthParams && reqURL.indexOf("?") != -1) {
					reqURL += "&" + oauthParams;
				} else {
					reqURL += "?" + oauthParams;
				}
			} else {
				header[com.cocoafish.constants.oauth_header] = OAuth.getAuthorizationHeader("", message.parameters);
			}
		}
		if(com.cocoafish.js.sdk.utils.BrowserDetect.browser == com.cocoafish.constants.appcelerator) {
			com.cocoafish.js.sdk.utils.sendAppceleratorRequest(reqURL, apiMethod, data, header, callback, this);
		} else {
			//send the request
			if(method.toUpperCase() == com.cocoafish.constants.get_method) {
				$.getCORS(reqURL, data, serverCallback, com.cocoafish.constants.json, header);
			} else if(method.toUpperCase() == com.cocoafish.constants.post_method) {
				$.postCORS(reqURL, data, serverCallback, com.cocoafish.constants.json, header, {withCredentials:true});
			} else if(method.toUpperCase() == com.cocoafish.constants.put_method) {
				$.putCORS(reqURL, data, serverCallback, com.cocoafish.constants.json, header, {withCredentials:true});
			} else if(method.toUpperCase() == com.cocoafish.constants.delete_method) {
				$.deleteCORS(reqURL, data, serverCallback, com.cocoafish.constants.json, header, {withCredentials: true});
			}
		}
	}
};


//authorization request needs to be sent explicitly
//options expected: redirectUri, useSecure, params
//params option is an object containing arguments for popup window or iframe
Cocoafish.prototype.sendAuthRequest = function(options) {
	
  //send a request to authorization server
  //authorization server will redirect browser for login
  //if logged in authorizations server will redirect browser back to original auth url
  //after authorized authorization server will redirect browser back to redirectUri
  //app can then send API request using access token obtained from authorization server
  var authType = com.cocoafish.js.sdk.utils.getAuthType(this);
  if(authType !== com.cocoafish.constants.three_legged_oauth) {
      alert('wrong authorization type!');
      return;
  }

  options = options || {};
  
  var isSecure = false;
  if(typeof(options.useSecure) == 'boolean') {
      isSecure = options.useSecure;
  }

  //build request url
  var reqURL = '';
  if(isSecure) {
      reqURL += com.cocoafish.sdk.url.https;
  } else {
      reqURL += com.cocoafish.sdk.url.http;
  }
  reqURL += this.authBaseURL;
  reqURL += '/oauth/authorize';
  reqURL += com.cocoafish.constants.clientIdParam + this.oauthKey;
  reqURL += com.cocoafish.constants.responseTypeParam + 'token';
  if(options.redirectUri) {
      reqURL += com.cocoafish.constants.redirectUriParam + options.redirectUri;
  } else {
      reqURL += com.cocoafish.constants.redirectUriParam + this.redirectUri;
  }
  //alert('sendAuthRequest -> reqURL:' + reqURL);

	if(this.getUIMode() === 'POPUP') {
		var params = options.params || {};
		params.action = 'login';
		params.url = reqURL;
		
		var that = this;
		var cb = params.cb;
		if(cb) delete params.cb;
		com.cocoafish.js.sdk.ui(params, function(data) {
			that.saveSession(data);
			cb & cb(data);
		});

 } else {
  	window.location = reqURL;
 }
};


//signing up request needs to be sent explicitly
//options expected: redirectUri, useSecure, params
//params option is an object containing arguments for popup window or iframe
Cocoafish.prototype.signUpRequest = function(options) {
	
  //send a request to authorization server
  //authorization server will redirect browser for signup
  //if signed up successfully authorizations server will redirect browser back to auth url
  //after authorized authorization server will redirect browser back to redirectUri
  //app can then send API request using access token obtained from authorization server
  var authType = com.cocoafish.js.sdk.utils.getAuthType(this);
  if(authType !== com.cocoafish.constants.three_legged_oauth) {
      alert('wrong authorization type!');
      return;
  }

  options = options || {};
  
  var isSecure = false;
  if(typeof(options.useSecure) == 'boolean') {
      isSecure = options.useSecure;
  }

  //build request url
  var reqURL = '';
  if(isSecure) {
      reqURL += com.cocoafish.sdk.url.https;
  } else {
      reqURL += com.cocoafish.sdk.url.http;
  }
  reqURL += this.authBaseURL;
  reqURL += '/users/sign_up';
  reqURL += com.cocoafish.constants.clientIdParam + this.oauthKey;
  if(options.redirectUri) {
      reqURL += com.cocoafish.constants.redirectUriParam + redirectUri;
  } else {
      reqURL += com.cocoafish.constants.redirectUriParam + this.redirectUri;
  }
  //alert('signUpRequest -> reqURL:' + reqURL);

	if(this.getUIMode() === 'POPUP') {
		var params = options.params || {};
		params.action = 'signup';
		params.url = reqURL;
		
		var that = this;
		var cb = params.cb;
		if(cb) delete params.cb;
		com.cocoafish.js.sdk.ui(params, function(data) {
			that.saveSession(data);
			cb & cb(data);
		});

 } else {
  	window.location = reqURL;
 }
};

//Invalidating request needs to be sent explicitly
//options expected: redirectUri, useSecure, params
//params option is an object containing arguments for popup window or iframe
Cocoafish.prototype.invalidateTokenRequest = function(options) {
	
  //send a request to invalidate the current access token
  //authorization server will redirect to rediretUri or return back javascript code to post
  //message to main window depending on the mode (CURRENT/POPUP).
  //client should redirect user back to the home page and show current status accordingly.

  var authType = com.cocoafish.js.sdk.utils.getAuthType(this);
  if(authType !== com.cocoafish.constants.three_legged_oauth) {
      alert('wrong authorization type!');
      return;
  }

  options = options || {};

  var isSecure = false;
  if(typeof(options.useSecure) == 'boolean') {
      isSecure = options.useSecure;
  }

  //build request url
  var reqURL = '';
  if(isSecure) {
      reqURL += com.cocoafish.sdk.url.https;
  } else {
      reqURL += com.cocoafish.sdk.url.http;
  }
  reqURL += this.authBaseURL;
  reqURL += '/oauth/invalidate?';
  reqURL += com.cocoafish.constants.accessToken + '=' + this.accessToken;
  
	if(this.getUIMode() !== 'POPUP') {
	    if(options.redirectUri) {
	        reqURL += com.cocoafish.constants.redirectUriParam + options.redirectUri;
	    } else {
	        reqURL += com.cocoafish.constants.redirectUriParam + this.redirectUri;
	    }
	}
	
  //alert('invalidateTokenRequest -> reqURL:' + reqURL);

  //Send Ajax request to authorization server to invalidate the access token
  //XMLHttpRequest cannot load http://localhost:3001/oauth/invalidate?access_token=9VUXyuWbnYXgOcQl8ISwH6h1aKSuhKx0WNWwn50G. Origin http://localhost is not allowed by Access-Control-Allow-Origin.
  // var serverCallback = function(responseData, responseStatus, requestObj) {
  // alert('responseData: ' + responseData);
  // alert('responseStatus: ' + responseStatus);
  // alert('requestObj: ' + requestObj);
  // if(responseData && responseData.meta && responseData.meta.session_id) {
  // }
  // //callback(responseData);
  // }
//
  // var	data = {};
  // var header = {};
//
  // $.getCORS(reqURL, data, serverCallback, com.cocoafish.constants.json, header);

    this.clearSession();

    if(this.getUIMode() === 'POPUP') {
		var params = options.params || {};
		params.action = 'logout';
		params.url = reqURL;
		
		var cb = params.cb;
		if(cb) delete params.cb;
		com.cocoafish.js.sdk.ui(params, function(data) {
			cb & cb(data);
		});
 } else {
  	window.location = reqURL;
 }

};

//Default implementation to store session in cookies.
//Developers can override this for custom implementation.
//data object should contain the following properties. The properties will also be added to the SDK object.
//	access_token
//	expires_in
Cocoafish.prototype.saveSession = function(data) {
    //TODO check validity of the access token
    if(!data.access_token) {
        this.authorized = false;
        return false;
    }
    com.cocoafish.js.sdk.utils.setCookie(com.cocoafish.constants.accessToken, data.access_token);
    com.cocoafish.js.sdk.utils.setCookie(com.cocoafish.constants.expiresIn, data.expires_in);
    this.accessToken = data.access_token;
    this.expiresIn = data.expires_in;

    //alert('Cocoafish saveSession called with: ' + data.access_token + ' ' + data.expires_in);
    this.authorized = true;
    return true;
};

//Default implementation to restore session from cookie
//Developers can override this for custom implementation.
//will return an data object containing the following properties. The properties will also be added to the SDK object.
//	access_token
//	expires_in
Cocoafish.prototype.getSession = function() {
    var data = {};
    data.access_token = com.cocoafish.js.sdk.utils.getCookie(com.cocoafish.constants.accessToken);
    data.expires_in = com.cocoafish.js.sdk.utils.getCookie(com.cocoafish.constants.expiresIn);
    //TODO check validity of the access token
    if(!data.access_token) {
        this.authorized = false;
        return false;
    }

    this.accessToken = data.access_token;
    this.expiresIn = data.expires_in;

    this.authorized = true;
    //alert('Cocoafish getSession called to get: ' + data.access_token + ' ' + data.expires_in);
    return data;
};

//Default implementation to clear session from cookie.
//Developers can override this for custom implementation.
Cocoafish.prototype.clearSession = function() {
    com.cocoafish.js.sdk.utils.setCookie(com.cocoafish.constants.accessToken, '');
    com.cocoafish.js.sdk.utils.setCookie(com.cocoafish.constants.expiresIn, '');
    delete this.accessToken;
    delete this.expiresIn;
    this.authorized = false;
    //alert('Cocoafish clearSession called');
};



//check the current session status: logged-in? just-authenticated? need-to-login?
Cocoafish.prototype.checkStatus = function() {

    var data = {};
    data.access_token = $.getURLParameter('access_token');
    data.expires_in = $.getURLParameter('expires_in');
    //alert('checkStatus -> access_token: ' + data.access_token);
    //alert('checkStatus -> expires_in: ' + data.expires_in);

    if(data.access_token) {
        var sessionValid = this.saveSession(data);
        //if there is a callback specified, try to call it
        var cb = $.getURLParameter('cb');
        if(cb && com.cocoafish.js.sdk.XD._callbacks[cb]) {
            com.cocoafish.js.sdk.XD._callbacks[cb]();
        }
        return sessionValid;

    } else {

        return this.getSession();

    }

};



/**
 * The cross domain communication layer.
 * 
 * @static
 * @access private
 */

com.cocoafish.js.sdk.XD = {
  _origin    : null,
  _transport : null,
  _callbacks : {},
  _forever   : {},

  /**
   * Initialize the XD layer. Native postMessage is required.
   *
   * @param channelUrl {String} optional channel URL
   * @access private
   */
  init: function(channelUrl) {
    // only do init once, if this is set, we're already done
    if (com.cocoafish.js.sdk.XD._origin) {
      return;
    }

    // postMessage does work with window.opener in IE8?
    if (window.addEventListener && window.postMessage) {
      // The origin here is used for postMessage security. It needs to be based on the URL of the current window. 
      com.cocoafish.js.sdk.XD._origin = (window.location.protocol + '//' + window.location.host + '/' + com.cocoafish.js.sdk.utils.guid());
      com.cocoafish.js.sdk.XD.PostMessage.init();
      com.cocoafish.js.sdk.XD._transport = 'postmessage';
    } else {
      com.cocoafish.js.sdk.XD._transport = 'fragment';
    }
  },


  /**
   * Handles the raw or parsed message and invokes the bound callback with the data.
   *
   * @access private
   * @param data {String|Object} the message fragment string or parameters
   */
  recv: function(data) {
    //for future use
	if (typeof data == 'string') {
      data = com.cocoafish.js.sdk.utils.decodeQS(data);
    }

    var cb = com.cocoafish.js.sdk.XD._callbacks[data.cb];
    if (!com.cocoafish.js.sdk.XD._forever[data.cb]) {
      delete com.cocoafish.js.sdk.XD._callbacks[data.cb];
    }
    cb && cb(data);
  },

  /**
   * Provides Native ``window.postMessage`` based XD support.
   *
   * @static
   * @access private
   */
  PostMessage: {
    /**
     * Initialize the native PostMessage system.
     *
     * @access private
     */
    init: function() {
      var H = com.cocoafish.js.sdk.XD.PostMessage.onMessage;
      window.addEventListener
        ? window.addEventListener('message', H, false)
        : window.attachEvent('onmessage', H);
    },

    /**
     * Handles a message event.
     *
     * @access private
     * @param event {Event} the event object
     */
    onMessage: function(event) {
      //alert('onMessage event.origin: ' + event.origin);
      com.cocoafish.js.sdk.XD.recv(event.data);
    }
  }
};
  

// NOTE: self executing code.
com.cocoafish.js.sdk.XD.init();

/**
 * Internal UI functions.
 *
 * @static
 * @access private
 */
com.cocoafish.js.sdk.UIManager = {
  /**
   * Action default parameters will be defined in this namespace.
   * Actions supported now: login, logout, signup
   */
  Actions: {},

  _active        : {},
  _defaultCb     : {}, //default callbacks for popup/iframe
  _iframeCb   	 : {}, //for iframe onload event


  /**
   * Prepares the call to an ui method (popup, iframe, and hidden)
   * * Load any default parameters defined for an action (login, logout, signup). 
   * The default parameters are stored in com.cocoafish.js.sdk.UIManager.Actions keyed 
   * by action name. Default parameters include ui method, cosmetic parameters for an
   * ui component (popup, iframe, etc.).
   * * Generate a GUID for this call. The ID will be included in request and sent back 
   * by server to identify the callback functions to call.
   * * Wrap the user specified callback functions in the default callback function. 
   * 
   * @access private
   * @param params {Object} the user supplied parameters
   * @param cb {Function} the user specified response callback
   * @returns {Object} the call data
   */
  processParams: function(params, cb) {
    var
      action = com.cocoafish.js.sdk.UIManager.Actions[params.action.toLowerCase()],
      id     = com.cocoafish.js.sdk.utils.guid();
      //alert('processParams - guid: ' + id);

    if (!action) {
      //alert('"' + params.action.toLowerCase() + '" is an unknown action. No default parameters defined for it.');
      // return;
    } else {
      //alert('"' + params.action.toLowerCase() + '" is a known action. Default parameters will be loaded if user does not specify.');
      com.cocoafish.js.sdk.utils.copy(params, action, false);
    }


    var relation = params.display == 'popup' ? 'opener' : 'parent';
    
    // the basic call data
    var call = {
      cb     : cb,
      id     : id,
      size   : params.size || {},
      url    : params.url + "&cb=" + id + "&rl=" + relation + "&xd=" + com.cocoafish.js.sdk.XD._transport,
      params : params
    };

    // optional action transform 
    //	- change URL by appending additional parameters
    //	- wrap cb for additional functions for specific actions
   if (action && action.transform) {
     call = action.transform(call);
     // no call returned cannot proceed
     if (!call) {
       return;
     }
   }

    var ecb = function(data) {
    	com.cocoafish.js.sdk.UIManager._xdRecv(data, cb);
    };

	// wrap callback into internal callback function to handle closing popup, etc.
	call.cb = ecb;

  	// save the callback for calling when there is message posted
  	com.cocoafish.js.sdk.XD._callbacks[call.id] = call.cb;

    //var cp = JSON.stringify(call.params);
    //var encodedQS = com.cocoafish.js.sdk.utils.encodeQS(JSON.stringify(call.params));
    // if ((call.url + encodedQS).length > 2000) {
      // call.post = true;
    // } else {
      // if (encodedQS) {
        // call.url += '?' + encodedQS;
      // }
    // }

    return call;
  },

  /**
   * Open a popup window with the given url and dimensions and place it at the
   * center of the current window.
   *
   * @access private
   * @param call {Object} the call data
   */
  popup: function(call) {
    // we try to place it at the center of the current window
    var
      screenX    = typeof window.screenX      != 'undefined'
        ? window.screenX
        : window.screenLeft,
      screenY    = typeof window.screenY      != 'undefined'
        ? window.screenY
        : window.screenTop,
      outerWidth = typeof window.outerWidth   != 'undefined'
        ? window.outerWidth
        : document.documentElement.clientWidth,
      outerHeight = typeof window.outerHeight != 'undefined'
        ? window.outerHeight
        : (document.documentElement.clientHeight - 22), // 22= IE toolbar height
      width    = call.size.width,
      height   = call.size.height,
      left     = parseInt(screenX + ((outerWidth - width) / 2), 10),
      top      = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
      features = (
        'scrollbars=1,width=' + width +
        ',height=' + height +
        ',left=' + left +
        ',top=' + top
      );

	com.cocoafish.js.sdk.UIManager._active[call.id] = window.open(
    	call.url,
    	call.id,
    	features
  	);

    // if there's a default close action, setup the monitor for it
    // if (call.id in com.cocoafish.js.sdk.UIManager._defaultCb) {
      // com.cocoafish.js.sdk.UIManager._popupMonitor();
    // }
  },

  /**
   * Builds and inserts a hidden iframe based on the given call data.
   *
   * @access private
   * @param call {Object} the call data
   */
  hidden: function(call) {
    call.className = 'CO_UI_Hidden';
    
    var hiddenDiv = jQuery("<div id='hiddendiv" + call.id + "'>");
    var 
    	divEle = hiddenDiv[0],
    	style      	   = divEle.style;
    style.position = 'absolute';
    style.top      = '-10000';
    style.width    = style.height = '0px';
    
    document.getElementsByTagName('body')[0].appendChild(divEle);
    
    call.root = divEle;
    com.cocoafish.js.sdk.UIManager._insertIframe(call);
  },


  /**
   * Builds and inserts a iframe dialog based on the given call data.
   *
   * @access private
   * @param call {Object} the call data
   */
  iframe: function(call) {
  	
    if(!call.className)
    	call.className = 'CO_UI_Dialog';

	var loginDialog = $("<div id='dialog" + call.id + "'>");
	loginDialog.dialog({
		autoOpen: false,
		height: call.size.height,
		width: call.size.width,
		modal: true,
		resizable: false,
		title: 'Login',
		closeText: 'hide',
		dialogClass:'dialogStyle',
		beforeClose: function(event, ui) {
			//com.cocoafish.js.sdk.UIManager._triggerDefault(call.id);
		}
	});
	call.root = loginDialog[0];
	
	loginDialog.dialog( "open" );

    com.cocoafish.js.sdk.UIManager._insertIframe(call);
  },

  /**
   * Inserts an iframe based on the given call data.
   * NOTE: These iframes have no border, overflow hidden and no scrollbars.
   *
   * @access private
   * @param call {Object} the call data
   */
  _insertIframe: function(call) {
  	
	  /*
	   * The opts can contain:
	   *   root       DOMElement  required root node (must be empty)
	   *   url        String      required iframe src attribute
	   *   className  String      optional class attribute
	   *   height     Integer     optional height in px
	   *   id         String      optional id attribute
	   *   name       String      optional name attribute
	   *   onload     Function    optional onload handler
	   *   width      Integer     optional width in px
	   */
  	 var opts = {
  	 	id		  : call.id,
  	 	name	  : call.id,
        url       : call.url,
        root      : call.root,
        className : call.className,
        width     : call.size.width - 30,
        height    : call.size.height - 50,
        onload    : function(node) {
          //alert('_insertIframe: another onload');
          com.cocoafish.js.sdk.UIManager._active[call.id] = node;
        }
  	 };

    // Dear IE, screw you. Only works with the magical incantations.
    // Dear FF, screw you too. Needs src _after_ DOM insertion.
    // Dear Webkit, you're okay. Works either way.
    var
      // Since we set the src _after_ inserting the iframe node into the DOM,
      // some browsers will fire two onload events, once for the first empty
      // iframe insertion and then again when we set the src. Here some
      // browsers are Webkit browsers which seem to be trying to do the
      // "right thing". So we toggle this boolean right before we expect the
      // correct onload handler to get fired.
      srcSet = false,
      onloadDone = false;
    com.cocoafish.js.sdk.UIManager._iframeCb[opts.id] = function() {
      if (srcSet && !onloadDone) {
      	//alert('_insertIframe: onload called!');
        onloadDone = true;
        opts.onload && opts.onload(opts.root.firstChild);
      }
    };

    if (document.attachEvent) {
      alert('_insertIframe: attachEvent supported');
      var html = (
        '<iframe' +
          ' id="' + opts.id + '"' +
          ' name="' + opts.name + '"' +
          (opts.className ? ' class="' + opts.className + '"' : '') +
          ' style="border:none;' +
                  (opts.width ? 'width:' + opts.width + 'px;' : '') +
                  (opts.height ? 'height:' + opts.height + 'px;' : '') +
                  '"' +
          ' src="' + opts.url + '"' +
          ' frameborder="0"' +
          ' scrolling="no"' +
          ' allowtransparency="true"' +
          ' onload="com.cocoafish.js.sdk.UIManager._iframeCb.' + opts.id + '()"' +
        '></iframe>'
      );

      // There is an IE bug with iframe caching that we have to work around. We
      // need to load a dummy iframe to consume the initial cache stream. The
      // setTimeout actually sets the content to the HTML we created above, and
      // because its the second load, we no longer suffer from cache sickness.
      // It must be javascript:false instead of about:blank, otherwise IE6 will
      // complain in https.
      // Since javascript:false actually result in an iframe containing the
      // string 'false', we set the iframe height to 1px so that it gets loaded
      // but stays invisible.
      opts.root.innerHTML = '<iframe src="javascript:false"'+
                            ' frameborder="0"'+
                            ' scrolling="no"'+
                            ' style="height:1px"></iframe>';

      // Now we'll be setting the real src.
      srcSet = true;

      // You may wonder why this is a setTimeout. Read the IE source if you can
      // somehow get your hands on it, and tell me if you figure it out. This
      // is a continuation of the above trick which apparently does not work if
      // the innerHTML is changed right away. We need to break apart the two
      // with this setTimeout 0 which seems to fix the issue.
      window.setTimeout(function() {
        opts.root.innerHTML = html;
      }, 0);
    } else {
    	
      //alert('_insertIframe: attachEvent not supported');
      // This block works for all non IE browsers. But it's specifically
      // designed for FF where we need to set the src after inserting the
      // iframe node into the DOM to prevent cache issues.
      var node = document.createElement('iframe');
      node.id = opts.id;
      node.name = opts.name;
      node.onload = com.cocoafish.js.sdk.UIManager._iframeCb[opts.id];
      node.style.border = 'none';
      node.style.overflow = 'hidden';
      if (opts.className) {
        node.className = opts.className;
      }
      if (opts.height) {
        node.style.height = opts.height + 'px';
      }
      if (opts.width) {
        node.style.width = opts.width + 'px';
      }
      opts.root.appendChild(node);

      // Now we'll be setting the real src.
      srcSet = true;

      node.src = opts.url;
    }
  },


  /**
   * Trigger the default action for the given call id.
   *
   * @param id {String} the call id
   */
  _triggerDefault: function(id) {
    com.cocoafish.js.sdk.UIManager._xdRecv(
      { frame: id },
      com.cocoafish.js.sdk.UIManager._defaultCb[id] || function() {}
    );
  },

  /**
   * Start and manage the window monitor interval. This allows us to invoke
   * the default callback for a window when the user closes the window
   * directly.
   *
   * @access private
   */
  _popupMonitor: function() {
    // check all open windows
    var found;
    for (var id in com.cocoafish.js.sdk.UIManager._active) {
      // ignore prototype properties, and ones without a default callback
      if (com.cocoafish.js.sdk.UIManager._active.hasOwnProperty(id) &&
          id in com.cocoafish.js.sdk.UIManager._defaultCb) {
        var win = com.cocoafish.js.sdk.UIManager._active[id];

        // ignore iframes
        try {
          if (win.tagName) {
            // is an iframe, we're done
            continue;
          }
        } catch (x) {
          // probably a permission error
        }

        try {
          // found a closed window
          if (win.closed) {
            com.cocoafish.js.sdk.UIManager._triggerDefault(id);
          } else {
            found = true; // need to monitor this open window
          }
        } catch (y) {
          // probably a permission error
        }
      }
    }

    if (found && !com.cocoafish.js.sdk.UIManager._popupInterval) {
      // start the monitor if needed and it's not already running
      com.cocoafish.js.sdk.UIManager._popupInterval = window.setInterval(
        com.cocoafish.js.sdk.UIManager._popupMonitor,
        100
      );
    } else if (!found && com.cocoafish.js.sdk.UIManager._popupInterval) {
      // shutdown if we have nothing to monitor but it's running
      window.clearInterval(com.cocoafish.js.sdk.UIManager._popupInterval);
      com.cocoafish.js.sdk.UIManager._popupInterval = null;
    }
  },


  /**
   * Handles the parsed message, invokes the bound callback with the data and
   * removes the related window/frame. This is the asynchronous entry point for
   * when a message arrives.
   *
   * @access private
   * @param data {Object} the message parameters. data.cb is the Id of this popup.
   * @param cb {Function} the user specified callback function
   */
  _xdRecv: function(data, cb) {
    var frame = com.cocoafish.js.sdk.UIManager._active[data.cb];

    //iframe
    try {
    	$('#dialog' + data.cb).dialog('close');
    	$('#dialog' + data.cb).remove();
    	$('#hiddendiv' + data.cb).remove();
    } catch (x) {
      // do nothing, permission error
    }

    // popup window
    try {
      if (frame && frame.close) {
        frame.close();
        com.cocoafish.js.sdk.UIManager._popupCount--;
      }
    } catch (y) {
    	alert(y);
      // do nothing, permission error
    }

    // cleanup and fire
    delete com.cocoafish.js.sdk.UIManager._active[data.cb];
    delete com.cocoafish.js.sdk.UIManager._defaultCb[data.cb];
    cb(data);
  }

};

com.cocoafish.js.sdk.UIManager.Actions = {
	login: {
		display:'iframe',
		size: {
			width: 500,
			height: 350
		}
	},
	logout: {
		display:'hidden',
		size: {
			width: 0,
			height: 0
		}
	},
	signup: {
		display:'popup',
		size: {
			width: 500,
			height: 650
		}
	}
};

/**
 * Method for triggering UI interaction with Authorization Server.
 *
 * @static
 * @access public
 * @param params {Object} The required arguments may vary based on the action
 * being used, but specifying the action itself is mandatory. If *display* is
 * not specified, then iframe dialogs will be used when possible, and popups
 * otherwise.
 *
 * Property | Type    | Description                        | Argument
 * -------- | ------- | ---------------------------------- | ------------
 * action   | String  | The UI dialog to invoke.           | **Required**
 * display  | String  | Specify `"popup"` to force popups. | **Optional**
 * @param cb {Function} Optional callback function to handle the result. Not
 * all methods may have a response.
 */
com.cocoafish.js.sdk.ui = function(params, cb) {
    if (!params.action) {
      alert('"action" is a required parameter for com.cocoafish.js.sdk.ui().');
      return;
    }

    var call = com.cocoafish.js.sdk.UIManager.processParams(params, cb);
    if (!call) { // aborted
      return;
    } else {
    	//alert('ui: ' + call);
    }

    // each allowed "display" value maps to a function
    var displayName = params.display;
    var displayFn = com.cocoafish.js.sdk.UIManager[displayName];
    if (!displayFn) {
      alert('"display" must be one of "popup", "iframe" or "hidden".');
      return;
    }

    displayFn(call);
};
