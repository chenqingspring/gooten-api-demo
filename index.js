$(document).ready(function() {


	$('.preview-button').click(function() {

		html2canvas($(".content"), {
            onrendered: function(canvas) {                      	
                

        	var raw_image_data = canvas.toDataURL().replace(/^data\:image\/\w+\;base64\,/, '');
        	var url = "https://up.qbox.me/putb64/-1";
        	var xhr = new XMLHttpRequest();

        	xhr.onreadystatechange = function(){
	          if (xhr.readyState == 4){
	            var data = JSON.parse(xhr.responseText);
	            console.log(data)	 
	            var previewImage = $('<img src="http://qiniu-cdn.carhot.cn/' + data.key + '"/>');
	            $('.preview').append(previewImage);
	            
	            var settings = {
					  "async": true,
					  "crossDomain": true,
					  "url": "https://api.print.io/api/v/5/source/api/productpreview/?recipeid=f255af6f-9614-4fe2-aa8b-1b77b936d9d6",
					  "method": "POST",
					  "headers": {
					    "content-type": "application/json"
					  },
					  "processData": false,
					  "data": "{\"SKU\":\"BathMat-24x17\",\"Template\":\"Single\",\"Images\":[{\"LayerId\":\"9A5BD\",\"Image\":{\"Url\":\""+ "http://qiniu-cdn.carhot.cn/" + data.key +"\",\"MaxFit\":\"true\",\"X1\":677,\"X2\":3152,\"Y1\":72,\"Y2\":1227}}]}"
					}

					$.ajax(settings).done(function (res) {					
					  console.log(res.Images[0].Url);
					  var gootenPreviewImage = res.Images[0].Url

					  var previewImage = $('<img src="' + gootenPreviewImage + '"/>');
	            	 $('.preview').append(previewImage);	            

					});
	          }
	        }

        	xhr.open("POST", url, true);
        	xhr.setRequestHeader("Content-Type", "application/octet-stream");
        	xhr.setRequestHeader("Authorization", "UpToken " + '-V84lk2YaiD65JZ1_pYK9JyXdj8-BWhYdAR1_Fsp:ett7wLrZwAWcG5AymaTo-3L2M6Q=:eyJzY29wZSI6InNldmVuY2FycyIsImRlYWRsaW5lIjoxNDk1MjY1OTM2fQ==');
        	xhr.send(raw_image_data);
            }
        });
	})

})