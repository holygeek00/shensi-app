'use client'
import React, { useEffect } from 'react'

const ChatwootWidget = () => {
  useEffect(() => {
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: 'right', // This can be left or right
      locale: 'zh-cn', // Language to be set
      type: 'standard', // [standard, expanded_bubble]
      launcherTitle: "联系我们"
    };

    (function (d, t) {
      var BASE_URL = "https://app.chatwoot.com"
      var g = d.createElement(t), s = d.getElementsByTagName(t)[0]
      g.src = BASE_URL + "/packs/js/sdk.js"
      s.parentNode.insertBefore(g, s)
      g.async = !0
      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: '1anpQBaCZjDaivqJQk8GykZ8',
          baseUrl: BASE_URL
        })
      }
    })(document, "script")
  }, [])

  return null
}

export default ChatwootWidget
