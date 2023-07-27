const path = require("path");
const fs = require("fs");
const Inquirer = require("inquirer");
const { getQuestions, getDefaultConfig } = require("./utils/index");

// 选项收集
const collect = async (modules) => {
	const answer = await new Inquirer.prompt(getQuestions(modules));
	const find = modules.find((item) => item.projectId == answer.projectId);
	action(find, answer);
}

// 命令行参数解析
const analysis = (modules, value) => {
	const { project = "", ver: version = "", environment = "stag" } = value;
	const find = modules.find((item) => item.projectId == project);
	const options = {
		environment
	};
	if (version) {
		Object.assign(options, { version })
	}
	action(find, options);
}

// 执行构建脚本
const action = (row, options = {}) => {
	if (row) {
		const config = Object.assign({}, getDefaultConfig(), row, options);
		const routineName = config.source || config.platform;
		const platformFile = path.join(__dirname, `./routine/${routineName}.js`);
		if (fs.existsSync(platformFile)) {
			const { render } = require(platformFile);
			render(config);
		} else {
			console.error("error: Build platform not supported");
		}
	} else {
		console.error("error: Target does not exist")
	}
}

module.exports = function (value = {}) {
	const configFile = path.join(process.cwd(), "ci.config.js");
	if (fs.existsSync(configFile)) {
		const { modules = [] } = require(configFile);
		if (modules.length) {
			if (value.project || value.ver || value.environment) {
				if (value.project) {
					analysis(modules, value);
				} else {
					console.error("error: Params project required");
				}
			} else {
				collect(modules);
			}
		} else {
			console.error("error: Configuration file error");
		}
	} else {
		console.error("error: The configuration file does not exist");
	}
};