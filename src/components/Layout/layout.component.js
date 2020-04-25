import React from 'react';
import Header from './Header/header.component';
import Footer from './Footer/footer.component';
import Content from './Content/content.component';

const Layout = (props) => {
  const {
    outline,
    children,
    headerProps,
    ...rest
  } = props;

  return (
		<>
			<Header {...headerProps} />

			<Content {...rest}>{children}</Content>

			{!outline && <Footer />}
		</>
	);
};

export { Layout };
