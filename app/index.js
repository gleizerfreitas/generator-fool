'use strict';

var Generator = require('yeoman-generator'),
	mkdirp = require('mkdirp'),
	yosay = require('yosay'),
	chalk = require('chalk');

module.exports = class extends Generator {
	initializing() {
		var message = chalk.yellow.bold('Welcome,') + chalk.yellow('Yo fool!');
		this.log(yosay(message, { maxLength: 10 }));
	}

	prompting() {
		return this.prompt([{
			type    : 'input',
			name    : 'name',
			message	: 'What is the name of this project?',
			default : this.appname
		}, {
			type    : 'input',
			name	: 'description',
			message	: 'What is the project description?',
			default : this.appname
		}, {
			type    : 'input',
			name	: 'yourname',
			message	: 'What is your name?',
			default	: 'Gleizer Freitas'
		}, {
			type    : 'input',
			name	: 'youremail',
			message	: 'What is your e-mail?',
			default	: 'gleizerf@gmail.com'
		}, {
			type    : 'input',
			name	: 'tinifyAPIKey',
			message	: 'What is your tinifyAPIKey?',
			default	: '0Fd5wTMn0Rzfx5gSsp8v5dPXhC6cc27f'
		}, {
			type    : 'input',
			name	: 'version',
			message	: 'What is the version of your app?',
			default	: '0.1.0'
		}]).then((answers) => {
			this.appname = answers.name;
			this.appdescription = answers.description;
			this.appauthor = answers.yourname;
			this.youremail = answers.youremail;
			this.tinifyAPIKey = answers.tinifyAPIKey;
			this.appversion = answers.version;
		});
	}

	configuring() {
		this.config.save();
	}

	writing() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
			templateContext = {
				appname: this.appname,
				appdescription: this.appdescription,
				appauthor: this.appauthor,
				youremail: this.youremail,
				tinifyAPIKey: this.tinifyAPIKey,
				appversion: this.appversion,
				appyear: new Date().getFullYear()
			};

		this.fs.copy(sourceRoot + '/src', destRoot + '/src');
		this.fs.copy(sourceRoot + '/_gitignore', destRoot + '/.gitignore');
		this.fs.copyTpl(sourceRoot + '/Gulpfile.js', destRoot + '/Gulpfile.js', templateContext);
		this.fs.copyTpl(sourceRoot + '/package-gulp.json', destRoot + '/package.json', templateContext);
		this.fs.copyTpl(sourceRoot + '/LICENSE', destRoot + '/LICENSE', templateContext);
		this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
	}

	install() {
		var message = chalk.yellow.bold('install dependencies...');
		this.log(yosay(message, { maxLength: 20 }));
		this.npmInstall();
	}

	end() {
		this.spawnCommand('gulp', ['build']);
	}
};