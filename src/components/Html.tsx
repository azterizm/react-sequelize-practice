import { FC } from "react";

interface HtmlProps {
  children: string,
  scripts: string[]
  state: AppState,
  sheets: string
}

export const Html: FC<HtmlProps> = ({ state, children, scripts, sheets }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet" />
      {typeof window === 'undefined' && (
        <style dangerouslySetInnerHTML={{ __html: sheets }} type='text/css' />
      )}
    </head>
    <body>

      <div id="root" dangerouslySetInnerHTML={{ __html: children }} />

      {state &&
        <script dangerouslySetInnerHTML={{ __html: `window.APP_STATE=${JSON.stringify(state)}` }} />
      }

      {scripts.map((item, i) => <script src={item} key={i} />)}

    </body>
  </html>
)


