import { ChunkExtractor } from "@loadable/server";
import React, { FC } from 'react';

interface HtmlProps {
  children: string,
  state: AppState,
  sheets: string,
  extractor: ChunkExtractor
}

export const Html: FC<HtmlProps> = ({ extractor, state, children, sheets }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet" />
      <style id='ssrStylesheet' dangerouslySetInnerHTML={{ __html: sheets }} type='text/css' />
      {extractor.getLinkElements()}
    </head>
    <body>

      {state.user ? <div id='root' /> : <div id='root' dangerouslySetInnerHTML={{ __html: children }} />}

      {state &&
        <script dangerouslySetInnerHTML={{ __html: `window.APP_STATE=${JSON.stringify(state)}` }} />
      }

      {extractor.getScriptElements()}

    </body>
  </html>
)


