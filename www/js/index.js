/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
	scriptErrorMesssage: "Impossible de contacter l'hôte distant merci de réessayer plus tard",
	connectErrorMessage: "Cette application demande une connextion internet",
    // Bind Event Listeners

    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
		if(id == 'deviceready'){
			if(navigator.network.connection.type == Connection.NONE){
				navigator.notification.alert(
					app.connectErrorMessage,  // message
					app.alertDismissed,         // callback
					'Problème de connexion',            // title
					'Fermer'                  // buttonName
				);
            }
			else{				
				var url = 'http://orionuser:PreProdPass@preprod.bkg.ma/app/login';	
				// var url ='http://www.pyxicom.com';
				// var target = '_self';
				// var target = '_system';
				var target = '_blank';
		    
				var inAppBrowserRef = cordova.InAppBrowser.open(url, target,'location=no,zoom=no,clearcache=yes,clearsessioncache=yes,toolbar=no');
				
				inAppBrowserRef.addEventListener('loadstart', function(e) {
					var url = e.url;
					var extension = url.substr(url.length - 4);
					if (extension == '.pdf') {
						//window.open(url, '_system', '');
						var pdf = cordova.InAppBrowser.open(url, '_system','');
					}
				});
				
				inAppBrowserRef.addEventListener('loaderror',function(){
					navigator.notification.alert(
						app.scriptErrorMesssage,  // message
						app.alertDismissed,         // callback
						'Problème de connexion',            // title
						'Fermer'                  // buttonName
					);
				});
			
			}
		}
    },
	alertDismissed: function(){
		navigator.app.exitApp();
	}
};