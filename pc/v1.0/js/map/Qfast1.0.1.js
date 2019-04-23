(function() {
	var _Doc = document,
		_loaded = {},
		_loading_queue = {},
		_isArray = function(e) {
			return e.constructor === Array;
		},
		_config = {
			core_lib: ['js/map/Koala.min.1.3.3.js'],
			mods: {}
		},
		_file = _Doc.getElementsByTagName('script')[0],
		_load = function(url, type, charset, cb, context) {
			if(!url) {
				return;
			}
			if(_loaded[url]) {
				_loading_queue[url] = false;
				if(cb) {
					cb(url, context);
				}
				return;
			}
			if(_loading_queue[url]) {
				setTimeout(function() {
					_load(url, type, charset, cb, context);
				}, 1);
				return;
			}
			_loading_queue[url] = true;
			var n, t = type || url.toLowerCase().substring(url.lastIndexOf('.') + 1);
			if(t === 'js') {
				n = _Doc.createElement('script');
				n.setAttribute('type', 'text/javascript');
				n.setAttribute('src', url);
				n.setAttribute('async', true);
			} else if(t === 'css') {
				n = _Doc.createElement('link');
				n.setAttribute('type', 'text/css');
				n.setAttribute('rel', 'stylesheet');
				n.setAttribute('href', url);
				_loaded[url] = true;
			}
			if(charset) {
				n.charset = charset;
			}
			if(t === 'css') {
				_file.parentNode.insertBefore(n, _file);
				if(cb) {
					cb(url, context);
				}
				return;
			}
			n.onload = n.onreadystatechange = function() {
				if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
					_loaded[this.getAttribute('src')] = true;
					if(cb) {
						cb(this.getAttribute('src'), context);
					}
					n.onload = n.onreadystatechange = null;
				}
			};
			_file.parentNode.insertBefore(n, _file);
		},
		_calculate = function(e) {
			if(!e || !_isArray(e)) {
				return;
			}
			var i = 0,
				item, result = [],
				mods = _config.mods,
				depeList = [],
				hasAdded = {},
				getDepeList = function(e) {
					var i = 0,
						m, reqs;
					if(hasAdded[e]) {
						return depeList;
					}
					hasAdded[e] = true;
					if(mods[e].requires) {
						reqs = mods[e].requires;
						for(; m = reqs[i++];) {
							if(mods[m]) {
								getDepeList(m);
								depeList.push(m);
							} else {
								depeList.push(m);
							}
						}
						return depeList;
					}
					return depeList;
				};
			for(; item = e[i++];) {
				if(mods[item] && mods[item].requires && mods[item].requires[0]) {
					depeList = [];
					hasAdded = {};
					result = result.concat(getDepeList(item));
				}
				result.push(item);
			}
			return result;
		},
		_queue = function(e) {
			if(!e || !_isArray(e)) {
				return;
			}
			this.queue = e;
			this.current = null;
		};
	_queue.prototype = {
		_interval: 10,
		start: function() {
			var o = this;
			this.current = this.next();
			if(!this.current) {
				this.end = true;
				return;
			}
			this.run();
		},
		run: function() {
			var o = this,
				mod, currentMod = this.current;
			if(typeof currentMod === 'function') {
				currentMod();
				this.start();
				return;
			} else if(typeof currentMod === 'string') {
				if(_config.mods[currentMod]) {
					mod = _config.mods[currentMod];
					_load(mod.path, mod.type, mod.charset, function(e) {
						o.start();
					}, o);
				} else if(/\.js|\.css/i.test(currentMod)) {
					_load(currentMod, '', '', function(e, o) {
						o.start();
					}, o);
				} else {
					this.start();
				}
			}
		},
		next: function() {
			return this.queue.shift();
		}
	};
	this.Qfast = function() {
		var args = Array.prototype.slice.call(arguments, 1),
			thread;
		if(arguments[0]) {
			thread = new _queue(_calculate(_config.core_lib.concat(args)));
		} else {
			thread = new _queue(_calculate(args));
		}
		thread.start();
	};
	this.Qfast.add = function(sName, oConfig) {
		if(!sName || !oConfig || !oConfig.path) {
			return;
		}
		_config.mods[sName] = oConfig;
	};
})(); /*  |xGv00|dbb5f49f16f84d6ca590a297e86b5b10 */