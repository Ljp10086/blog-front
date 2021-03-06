import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext
} from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="zh-cn">
				<Head>
					<link
						rel="stylesheet"
						href="https://at.alicdn.com/t/font_3348767_k8vlavwm30k.css?spm=a313x.7781069.1998910419.57&file=font_3348767_k8vlavwm30k.css"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
