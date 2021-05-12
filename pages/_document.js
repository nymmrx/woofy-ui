import Document, { Html, Head, Main, NextScript } from "next/document";

export default class WoofyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            async
            defer
            data-domain="woofy.finance"
            src="https://analytics.nymm.app/js/plausible.js"
          ></script>
        </body>
      </Html>
    );
  }
}
