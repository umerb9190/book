import { useRouter } from "next/router"
export default function InfoPage(){
    const router=useRouter();
    const {slug}=router.query;
    console.log(slug)
    return (
        <div>
            <h1>Info Page</h1>
            <p>{slug ? slug.join(' / ') : 'General Information'}</p>
        </div>
    );
}