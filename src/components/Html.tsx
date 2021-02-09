import { FC } from "react";

interface HtmlProps {
  children: string,
  scripts: string[]
  state: AppState
}

export const Html: FC<HtmlProps> = ({ state, children, scripts }) => (
  <html lang="en">
    <head>
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


