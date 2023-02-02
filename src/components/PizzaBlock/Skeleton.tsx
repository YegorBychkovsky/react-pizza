import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton:React.FC = (props) => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="131" cy="133" r="125" />
		<rect x="-1" y="277" rx="10" ry="10" width="280" height="21" />
		<rect x="1" y="316" rx="10" ry="10" width="280" height="88" />
		<rect x="1" y="423" rx="10" ry="10" width="95" height="30" />
		<rect x="139" y="417" rx="25" ry="25" width="140" height="40" />
	</ContentLoader>
);

export default Skeleton;
