
    const ApiRoutes : IApiRoutes={
        create :"/create",
        update :"/:id",
        delete : "/:id"
    }

interface IApiRoutes{
    create:string,
    update :string,
    delete : string
}

//export default ApiRoutes