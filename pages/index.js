// pages/index.js
export async function getServerSideProps() {
    return {
        redirect: {
            destination: '/landing',
            permanent: false,
        },
    };
}

export default function Home() {
    return null; // This component will not be rendered
}