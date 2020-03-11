const path = require('path');
const fs = require('fs');

const templatesDir = path.resolve(__dirname, '../templates');

const render = employees => {

    const html = [];

    html.push(employees
        .filter(employee => employee.getrole() === 'Manager')
        .map(manager => renderManager(manager))
    );
    html.push(employees
        .filter(employee => employee.getrole() === 'Engineer')
        .map(engineer => renderEngineer(engineer))
    );
    html.push(employees
        .filter(employee => employee.getrole() === 'Intern')
        .map(intern => renderIntern(intern))
    );

    return renderMain(html.join(''));
};

const renderManager = manager => {

    let template = fs.readFileSync(path.resolve(templatesDir, 'manager.html'), 'utf8');

    template = renderPlaceholder(template, 'name', manager.getName());
    template = renderPlaceholder(template, 'role', manager.getRole());
    template = renderPlaceholder(template, 'email', manager.getEmail());
    template = renderPlaceholder(template, 'id', manager.getId());
    template = renderPlaceholder(template, 'officeNumber', manager.getofficeNumber());

    return template;
};

const renderEngineer = engineer => {

    let template = fs.readFileSync(path.resolve(templatesDir, 'engineer.html'), 'utf8');

    template = renderPlaceholder(template, 'name', engineer.getName());
    template = renderPlaceholder(template, 'role', engineer.getRole());
    template = renderPlaceholder(template, 'email', engineer.getEmail());
    template = renderPlaceholder(template, 'id', engineer.getId());
    template = renderPlaceholder(template, 'github', engineer.getGithub());

    return template;
};

const renderIntern = intern => {

    let template = fs.readFileSync(path.resolve(templatesDir, 'intern.html'), 'utf8');

    template = renderPlaceholder(template, 'name', intern.getName());
    template = renderPlaceholder(template, 'role', intern.getRole());
    template = renderPlaceholder(template, 'email', intern.getEmail());
    template = renderPlaceholder(template, 'id', intern.getId());
    template = renderPlaceholder(template, 'school', intern.getSchool());

    return template;
};

const renderMain = html => {
    const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
    return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
};

module.exports = render;