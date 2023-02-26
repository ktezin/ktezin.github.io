import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
	VscChromeClose,
	VscChromeMinimize,
	VscChromeRestore,
} from "react-icons/vsc";

import { MdArrowBack, MdArrowForward, MdRefresh } from "react-icons/md";

import { GrAppsRounded } from "react-icons/gr";

import { FaFirefoxBrowser } from "react-icons/fa";
import { useEffect, useState } from "react";

function App() {
	const [repos, setRepos] = useState([]);

	useEffect(() => {
		async function loadRepos() {
			await fetch(`https://api.github.com/users/ktezin/repos`)
				.then((response) => response.json())
				.then((data) => {
					const items = data.map((repo) => ({
						name: repo.full_name,
						description: repo.description,
					}));
					setRepos(items);
				});
		}
		loadRepos();
	}, []);

	return (
		<div className="app">
			<div className="window">
				<div className="window-header glassy">
					<div className="tabs">
						<div className="tab glassy">Portfolio of Kağan T</div>
						<div className="tab glassy">+</div>
					</div>
					<div>
						<VscChromeMinimize size={"20"} />
						<VscChromeRestore size={"20"} />
						<VscChromeClose size={"20"} />
					</div>
				</div>
				<div className="toolbar glassy">
					<div className="navigation">
						<MdArrowBack size={"20"} />
						<MdArrowForward size={"20"} />
						<MdRefresh size={"20"} />
					</div>
					<div className="search-box">https://ktezin.github.io</div>
				</div>
				<div className="window-content">
					<div className="portfolio">
						<div className="paper">
							<h1>Kağan Tezin</h1>
							<h2>Developer</h2>
							<p>I'm a full-stack solo web developer</p>
						</div>
						<div className="chips">
							<button className="chip">JavaScript</button>
							<button className="chip">Express</button>
							<button className="chip">React</button>
						</div>
						<div className="repos-container glassy">
							<h4>My Repositories</h4>
							<ul className="repos">
								{repos.map((repo, key) => (
									<li key={key} className="repo">
										<a href={`https://github.com/${repo.name}`}>
											<p>{repo.name}</p>
											<p className="repo-description">{repo.description}</p>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="taskbar glassy">
				<GrAppsRounded size={30} />
				<FaFirefoxBrowser size={30} />
			</div>
		</div>
	);
}

export default App;