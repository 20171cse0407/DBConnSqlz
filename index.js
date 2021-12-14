const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const express = require('express');
// const {default : ApiRoutes} = require('./api/Api');
const app  = express();
const sequelize= new Sequelize('ConnectionTest','postgres','ishaq123',{
  dialect: 'postgres' ,
//   define :{
//       freezeTableName : true   // if you had more than 1 table
//   } 
})
app.use(express.json())

//sequelize.sync({force: true}); // if you had more than one table 
                                //then by doing this will automatically 
                                //deletes the existing one and creates another
//sequelize.sync({alter: true}); // -||- alters
// sequelize.drop({match: /er$/});  //drops the table whose name ends with 'er
app.get('/',(req,res)=>{
    res.send("Welcome 1")
})

const User  = sequelize.define('user', {
    user_id:  {
        type :DataTypes.INTEGER,
        primarykey: true,
       //autoIncrement : true
    },
    username : {
        type :DataTypes.STRING,
        allowNull : false
    },
    password: {
        type :DataTypes.STRING
    },
    age : {
        type :DataTypes.INTEGER
    },
    vaccinated : {
        type :DataTypes.BOOLEAN,
        defaultValue : false
    }
    
},{
    freezeTableName : true, // sets your table name as you specified (by default it takes it as plural)
    timestamps : false
})

// sequelize.authenticate().then(()=>{
//     console.log("Connection Successful")
// }).catch(error=>{
//     console.log("ERROR") 
// })
console.log("------*******------------*********----------***********-------------------")
// console.log(ApiRoutes)
// console.log(sequelize.models.user)
// User.sync({ alter: true }).then(()=>{
//     console.log("Table synced successfully")
// }).catch(error=>{
//     console.log("Table not synced")
// })

//CREATE
app.post('/create',(req,res)=>{
    User.sync({alter: true}).then(()=>{
        return User.create({
            
             username: req.body.username,
             password: req.body.password,
             age: req.body.age,
             vaccinated : req.body.vaccinated,
         })
     
     }).then((data)=>{
         res.send(data);
     }).catch(error=>{
         console.log(error)
     })
})
app.put('/update/:id',(req,res)=>{
    User.sync({alter: true}).then(()=>{
        return User.findOne({where:{id : req.params.id}}).then( data=>{
            if(!data)
            throw new Error('No record found')
            let values={
             username: req.body.username,
             password: req.body.password,
             age: req.body.age,
             vaccinated : req.body.vaccinated,
            }
            data.update(values).then(updatedRec=>{
                
            })
        })
     
     }).catch((error)=>{
         res.send(error);
     })
})

app.get('/users',(req,res)=>{
    User.sync({alter: true}).then(()=>{
        return User.findAll({attributes: ['username', 'password']});
     
     }).then((data)=>{
        data.forEach((elements)=>{
            res.send(elements.toJSON());
        }) 
     }).catch(error=>{
         console.log(error)
     })
})


app.listen(3001,()=>{
    console.log("Server running...")
})