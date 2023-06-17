import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="140" cy="125" r="125" />
        <rect x="0" y="265" rx="10" ry="10" width="280" height="33" />
        <rect x="0" y="315" rx="10" ry="10" width="280" height="86" />
        <rect x="0" y="425" rx="10" ry="10" width="90" height="36" />
        <rect x="130" y="421" rx="20" ry="20" width="150" height="46" />
    </ContentLoader>
);

export default Skeleton;
