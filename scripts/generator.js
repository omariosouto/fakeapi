const path = require('path');
const fs = require('fs');

function template(output) {
    return `
export default function handler(req, res) {
    res.status(200).json(${JSON.stringify(output, null, 2)})
}
    `;
}

function templateById(output) {
    return `
const db = ${JSON.stringify(output, null, 2)};
export default function handler(req, res) {
    const { id } = req.query;
    res.status(200).json(db[id - 1]);
}
    `;
}

const generators = {
    posts() {
        const folderPath = 'pages/api/posts';
        const seed = 1000;
        const posts = [];
        for(let i = 1; i <= seed; i++) {
            const post = {
                id: i,
                title: `Post #${i}`,
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porttitor aliquet nulla, eu pharetra lorem consectetur in. Donec a lacus arcu. Cras sodales tellus felis, at dictum erat gravida vitae. Praesent pellentesque ligula in egestas aliquam. Aenean sed magna sed enim tempus rutrum. Nunc egestas est eu purus imperdiet consectetur. Fusce id elit luctus, dapibus felis sit amet, ornare ipsum. Phasellus rhoncus tortor quis felis iaculis, nec tempus urna ultricies. Aenean accumsan tincidunt molestie. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis congue arcu dui, ac maximus velit pharetra sit amet. In auctor quam id tortor egestas porttitor. Donec malesuada ipsum massa. Praesent maximus lectus tortor. Curabitur euismod augue orci, et mollis dolor rutrum quis. Mauris congue, nisi sed consequat mattis, sem sapien placerat sapien, ac pellentesque mauris ex in lorem. Vivamus augue odio, suscipit eu tellus eu, egestas egestas lectus. Maecenas volutpat enim vitae nisi semper, a viverra nibh malesuada. Nulla eget enim sed quam porta volutpat faucibus vitae tortor. Nulla vitae nisi vehicula, iaculis libero ac, luctus arcu. Proin luctus a justo eget consequat. Curabitur vitae tortor placerat, ornare felis sed, rhoncus erat. Fusce consectetur est non lectus tristique egestas. Proin viverra nisi non ligula rutrum bibendum. Proin et ultrices sem. Morbi aliquet eleifend orci semper aliquet. Cras pretium et diam non facilisis. Phasellus accumsan ex ut imperdiet consequat. Aenean mollis tempus nisl ac euismod. Vivamus imperdiet finibus est quis hendrerit. Donec libero neque, pharetra consectetur nisi in, convallis placerat massa. Etiam aliquet augue non diam ornare, at finibus risus posuere. Phasellus quis nulla ut nisl cursus sollicitudin nec nec turpis. Duis justo ligula, viverra et bibendum eget, faucibus nec massa. Curabitur gravida dolor vitae tellus facilisis, vitae varius lacus vestibulum. Cras faucibus erat ultrices nunc dignissim, non laoreet tellus ultricies. Donec eu aliquam urna, nec ultrices magna. Duis consequat leo a egestas iaculis. Praesent in ultrices mi, sed ultrices nisi. Vivamus quis magna nec augue laoreet congue. Aenean rutrum nulla sem, sed aliquam orci luctus in. Etiam laoreet in lorem ac placerat. Etiam tincidunt elit augue, consequat fermentum enim hendrerit ut. Cras nec ipsum commodo, fermentum lectus sit amet, placerat ipsum. Praesent consectetur mi non arcu tempus ultrices. Aliquam vel vulputate velit. Vestibulum ultricies velit in lorem ornare vulputate. Ut ac velit a velit semper lacinia ut nec ante. Vivamus ac libero ac odio interdum luctus. Curabitur at metus sed lorem hendrerit pretium quis a dui. Aenean elementum rutrum nisi eu lobortis. Aliquam mollis magna dolor, et ultrices purus laoreet euismod. Aenean in congue mauris, id dignissim magna. Praesent bibendum risus eu ligula rhoncus tristique. Praesent non turpis interdum, pharetra nibh dapibus, tempus turpis. Vestibulum lacinia tincidunt tincidunt.`,
                video: `Post #${i} body`,
                date: "21/01/2022"
            };
            posts.push(post);
        }
        const byIdPath = path.resolve(__dirname, '..', folderPath, '[id].js');
        fs.writeFileSync(byIdPath, templateById(posts), 'utf8');
        const indexPath = path.resolve(__dirname, '..', folderPath, 'index.js');
        fs.writeFileSync(indexPath, template({ posts }), 'utf8');
    }
}


Object.entries(generators).forEach(([x, generator]) => {
    console.log('[Running]: "generatorName"');
    generator();
    console.log('[End]: "generatorName"');
});