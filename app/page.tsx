import BillionaireList from "@/app/components/BillionaireList";

export default function Home() {
	return (
		<div className='container mx-auto p-4'>
			<h1>Billionaires</h1>
			<BillionaireList />
		</div>
	);
}
