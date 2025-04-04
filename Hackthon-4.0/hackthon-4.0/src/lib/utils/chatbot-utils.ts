export const runYellowMessengerScript = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = 'chatbot-script';
  script.innerHTML = `
      window.ymConfig={"bot":"x1689927636784","host":"https://cloud.yellow.ai","payload":{}};
      (function () {
        var w=window,ic=w.YellowMessenger;
        if("function"===typeof ic)ic("reattach_activator"),ic("update",ymConfig);
        else{
          var d=document,i=function(){i.c(arguments)};
          function l(){var e=d.createElement("script");
          e.type="text/javascript",e.async=!0,e.src="https://cdn.yellowmessenger.com/plugin/widget-v2/latest/dist/main.min.js";
          var t=d.getElementsByTagName("script")[0];
          t.setAttribute("id","yellow-messenger-script");
          t.parentNode.insertBefore(e,t)}
          i.q=[],i.c=function(e){i.q.push(e)},w.YellowMessenger=i,l()
        }
      })();
    `;
  document.body.appendChild(script);
};
