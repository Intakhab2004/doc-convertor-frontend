"use client"

import SectionHeading from "@/app/components/SectionHeading"
import ToolCard from "@/app/components/ToolsCard"
import { tools } from "../page"


export default function ToolsPage(){
    return (
        <section className="relative py-24 px-5">
			<div className="max-w-6xl mx-auto">
				<SectionHeading
					badge="Our Tools" 
					title="Built for the Modern Creator" 
					sub="Each tool is individually crafted to solve a specific challenge — together they form an unbeatable productivity suite."
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{
						tools.map((t) => <ToolCard key={t.title} tool={t} />)
					}
				</div>
			</div>
		</section>
    )
}