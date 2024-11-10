import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton: React.FC = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="120" cy="120" r="120" />
        <rect x="0" y="262" rx="10" ry="10" width="250" height="34" />
        <rect x="0" y="317" rx="10" ry="10" width="250" height="76" />
        <rect x="0" y="416" rx="10" ry="10" width="90" height="30" />
        <rect x="97" y="409" rx="18" ry="18" width="152" height="45" />
    </ContentLoader>
)
