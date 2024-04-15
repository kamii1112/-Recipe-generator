import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [mealData, setMealData] = useState({
		meal: "",
		strArea: "",
		ingredients: {},
		instructions: "",
		image: "",
		category: "",
		youtube: ""
	});


	async function fetchData() {
		const URL = "https://www.themealdb.com/api/json/v1/1/random.php";
		try {
			const response = await fetch(URL);
			const data = await response.json();

			const ingre = {};

			for (let i = 1; i <= 20; ++i) {
				const eachIngredient = data?.meals[0]?.[`strIngredient${i}`];
				const eachMeasure = data?.meals[0]?.[`strMeasure${i}`];

				if (eachIngredient && eachMeasure) {
					ingre[i] = { recipe: eachIngredient, measure: eachMeasure };
				} else {
					break;
				}
			}

			setMealData(prevState => ({
				...prevState,
				meal: data?.meals[0]?.strMeal,
				strArea: data?.meals[0]?.strArea,
				ingredients: ingre,
				instructions: data?.meals[0]?.strInstructions,
				image: data?.meals[0]?.strMealThumb,
				category: data?.meals[0]?.strCategory,
				youtube: data?.meals[0]?.strYoutube
			}));

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="w-full flex flex-col items-center justify-center  px-5 min-h-full py-auto font-lora">
			<h1 className="text-3xl font-semibold tracking-widest my-5">Recipe Generator</h1>
			<div className="w-[95%] flex flex-row items-center justify-between  relative bg-slate-100 p-6 rounded-xl">

				<div className="w-[68%] ">
					<h1 className="text-2xl font-bold tracking-wider py-2">{mealData.meal}</h1>
					<div className="flex flex-row gap-3">
						<p className="px-3 py-1 rounded-xl bg-slate-200 text-xs">Category: {mealData.category}</p>
						<p className="px-3 py-1 rounded-xl bg-slate-200 text-xs">Area: {mealData.strArea}</p>
					</div>

					<h1 className="text-lg font-semibold">Ingredients Needed:</h1>
					{Object.keys(mealData.ingredients).map(key => (
						<div key={key}>
							<h1>{key}. {mealData.ingredients[key].measure} of {mealData.ingredients[key].recipe}</h1>
						</div>
					))}
					<h1 className="text-lg font-semibold">Instructions</h1>
					<p className="text-justify">{mealData.instructions}</p>
					<a href={mealData.youtube} className="underline text-red-500">Watch from Youtube</a>
				</div>
				<div className="w-[30%] h-full  absolute right-0 top-0 ">
					<img src={mealData.image} alt="" className="object-cover h-full object-center rounded-r-xl" />

				</div>
			</div>
		</div>
	);
}

export default App;
