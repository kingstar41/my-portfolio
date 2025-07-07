import React, { useState } from "react";
import "../styles/Works.css";
import { motion, AnimatePresence } from "framer-motion";
import { ReactData, ReactNativeData, VueData } from "../data/WorkData";
import WorkCard from "./WorkCard";

const Works = () => {
	const [activeTab, setActiveTab] = useState("all");

	const fade = {
		opacity: 1,
		transition: {
			duration: 1.4,
		},
	};

	// Animation variants for tab transitions
	const pageVariants = {
		initial: {
			opacity: 0,
			x: 20,
		},
		in: {
			opacity: 1,
			x: 0,
		},
		out: {
			opacity: 0,
			x: -20,
		},
	};

	const pageTransition = {
		type: "tween",
		ease: "anticipate",
		duration: 0.5,
	};

	// Combine all data for the "All" tab
	const allData = [...ReactData, ...VueData, ...ReactNativeData];

	const tabData = [
		{ id: "all", label: "All", data: allData },
		{ id: "react", label: "React", data: ReactData },
		{ id: "vue", label: "Vue", data: VueData },
		{ id: "react-native", label: "React Native", data: ReactNativeData },
	];

	return (
		<div className='works' id='works'>
			<div className='container'>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={fade}
					viewport={{ once: true }}
					className='heading'>
					<p className='heading-sub-text'>I build real value</p>
					<p className='heading-text'>Works</p>
				</motion.div>

				<div className='tabs'>
					{tabData.map((tab) => (
						<button
							key={tab.id}
							className={`tab ${activeTab === tab.id ? "active" : ""}`}
							onClick={() => setActiveTab(tab.id)}>
							{tab.label}
						</button>
					))}
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						initial="initial"
						animate="in"
						exit="out"
						variants={pageVariants}
						transition={pageTransition}
						className='works-box'>
						{tabData.map(
							(tab) =>
								activeTab === tab.id && (
									<React.Fragment key={tab.id}>
										{tab.data.map((w, index) => (
											<WorkCard w={w} tabId={tab.id} key={index} />
										))}
									</React.Fragment>
								)
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Works;
