import HeroSection from "../components/HeroSection";
import RecipesSection from "../components/RecipesSection";

export default function Home(){
    return (
        <div>
            <HeroSection />
            <RecipesSection private={false}/>
        </div>
    )
}