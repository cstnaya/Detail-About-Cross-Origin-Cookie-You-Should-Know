Detail About Cross Origin Cookie You Should Know
================================================

## Target

如果做前後端分離的專案，通常前後端是不同源的，在做 Cookie based Authentication 會遇到跨域設定 Cookie 失敗的問題。  

跨域設定 Cookie 預設是不允許的，因為這會有資安風險，當然若我們前後端設定妥當，跨域設定自然是沒有問題且安全的，以下是跨域設定任何 Cookie 時應該注意的事項。

## Main Points

1. **客戶端 ⇒** 要在請求附上 `withCredentials` 或 `credentials: 'include'`，表示允許寫入 Cookie，以及請求才會附上 Cookie
2. **伺服器  ⇒** 因為接收傳來的請求屬於**跨域請求**，所以要設定 `Access-Control-Allow-Origin`
3. **伺服器  ⇒** 由於傳來的請求帶有 `withCredentials`，`Access-Control-Allow-Origin` 值不能為 `*` ，要特別寫入前端的 origin
4. **伺服器  ⇒** 由於傳來的請求帶有 `withCredentials`，還要再設定 `Access-Control-Allow-Credentials: true`
5. (Chrome v80 更新) 如果只做到以上幾點，仍然無法設置成功，會跳出以下錯誤：
    
    ```
    This set-cookie didn't specify a "SameSite" attribute 
    and was defaulted to "SameSite=Lax" 
    and broke the same rules specified in the SameSiteLax value
    ```
    
    意思是說，這個 Cookie 的 sameSite 被設值為 Lax，Lax 是不能被跨域腳本設定的，因此 Cookie 被禁止。若想解決這個問題還要做到下面的設定！
    
6. Set-Cookie 的 options 要設定為 `sameSite: "none"`
7. 但如果要設定 `sameSite=none`，還得再設定 `secure=true` Cookie 才能被允許
8. 如此就能 Set-Cookie 了！

## Resources

- [網站安全🔒 再探同源政策，談 SameSite 設定對 Cookie 的影響與注意事項](https://medium.com/程式猿吃香蕉/再探同源政策-談-samesite-設定對-cookie-的影響與注意事項-6195d10d4441)
- [和 CORS 跟 cookie 打交道](https://medium.com/d-d-mag/和-cors-跟-cookie-打交道-dd420ccc7399)
- [Chrome 80 Cookie跨域 Samesite Lax 的错误](https://blog.csdn.net/aoshilang2249/article/details/107687791)

## Run Project on Local

1. 前端我設定跑在 http://localhost:5500
2. 後端設定在 http://localhost:8000
3. 進入 `/server` 後輸入 `npm run dev` 就能運行後端伺服器

## Tools

### 前端
- 純 JS/HTML

### 後端
- nodejs
- express
- cors plugin
- cookie-parser plugin