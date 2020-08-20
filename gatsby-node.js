const path = require(`path`)

exports.createPages = async ({actions, graphql}) => {
    const {data} = await graphql(`
    {
        politylink {
            Bill {
                id
            }
        }
    }
  `)

    console.log(JSON.stringify(data, null, 4))
    data.politylink.Bill.forEach(({id}) => {
        actions.createPage({
            path: "/bill/" + id.split(':').pop(),
            component: path.resolve(`./src/templates/bill.js`),
            context: {
                billId: id,
            },
        })
    })
}