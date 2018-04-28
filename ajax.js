export default {
    ajax(options){
        // 初始化参数
        options = options || {};
        options.type = (options.type || 'GET').toUpperCase();
        options.params = options.params || {};

        // 处理参数
        let paramsStr = '';
        for(let key in options.params){
            if(paramsStr){
                paramsStr += "&"
            }
            paramsStr += key + "=" + options.params[key]
        }

        // 处理URL
        if(options.type == 'GET'){
            options.url += "?" + paramsStr;
        }

        // 1.创建请求对象
        let xhr = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Msxml','XMLHTTP')
        }

        // 2.连接
        xhr.open(options.type,options.url,true);

        // ******** 跨域时带上cookie *********
        xhr.withCredentials = true;

        // 3.发送
        if(options.type = 'GET'){
            xhr.send();
        } else {
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencode');
            xhr.send(paramsStr);
        }

        // 4.监听状态变化，处理返回的数据
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    options.success && options.success(options.dataType == 'json' ? JSON.parse(xhr.responseText):xhr.responseText)
                }
            }
        }
    },

    get(url,params,success,dataType){
        this.ajax({
            type:'GET',
            url:url,
            params:params,
            success:success,
            dataType:dataType
        })
    },

    post(url,params,success,dataType){
        this.ajax({
            type:'POST',
            url:url,
            params:params,
            success:success,
            dataType:dataType
        })
    }
}