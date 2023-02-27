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

const App = () => {
	const [currentTab, setCurrentTab] = useState(0);
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
						<button className="tab glassy" onClick={() => setCurrentTab(0)}>
							Portfolio of Kağan
						</button>
						<button className="tab glassy" onClick={() => setCurrentTab(1)}>
							Contact Me
						</button>
						<button className="tab glassy">+</button>
					</div>
					<div>
						<VscChromeMinimize size={"20"} />
						<VscChromeRestore size={"20"} />
						<VscChromeClose size={"20"} />
					</div>
				</div>
				<div className="toolbar glassy">
					<div className="nav">
						<div className="nav-button">
							<MdArrowBack size={"20"} />{" "}
						</div>
						<div className="nav-button">
							<MdArrowForward size={"20"} />
						</div>
						<div className="nav-button">
							<MdRefresh size={"20"} />
						</div>
					</div>
					<div className="search-box">https://ktezin.github.io</div>
				</div>
				<div className="window-content">
					{currentTab === 0 ? (
						<div className="portfolio">
							<div className="paper">
								<h1>Kağan Tezin</h1>
								<p>I'm a self taught full-stack web developer</p>
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
							</div>{" "}
						</div>
					) : (
						<form className="contact-me glassy">
							<h1>Contact Me</h1>
							<input type="email" name="email" placeholder="Enter your email" />
							<input type="text" name="name" placeholder="Enter your name" />
							<textarea name="message" placeholder="Enter your message" />
							<button className="submit" type="submit">Send</button>
						</form>
					)}
				</div>
			</div>
			<div className="taskbar glassy">
				<GrAppsRounded size={30} />
				<FaFirefoxBrowser size={30} />
			</div>
		</div>
	);
};

export default App;
