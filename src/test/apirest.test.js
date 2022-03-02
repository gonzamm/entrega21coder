const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect

describe('test api rest full', ()=>{
    describe('PRODUCTOS', ()=>{
        it('GET productos deberia retornar un status 200', async ()=>{
            let response = await request.get('/api/productos')
            expect(response.status).to.eql(200)
        })
        it('GET producto existente deberia retornar un status 200', async()=>{
            let response = await request.get('/api/productos/61e0931bbcf2d104d8538205')
            expect(response.status).to.eql(200)
        })
        it('GET producto inexistente deberia retornar un status 400', async()=>{
            let response = await request.get('/api/productos/61e0931bbcf2d104d8538206')
            expect(response.status).to.eql(400)
        })
        it('POST con producto nuevo deberia retornar un status 200', async()=>{
            const newPto = {
                nombre: "Mochila azul",
                descripcion: "Una mochila azul",
                codigo: "5",
                thumbail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-128.png",
                precio: "1285.33",
                stock: "10"
              };
            let response = await request.post('/api/productos/').send(newPto)
            expect(response.status).to.eql(200)
        })
        it('PUT modificando un producto inexistente deberia retornar un status 400', async()=>{
            const modPto = {
                nombre: "Mochila negra",
                descripcion: "Una mochila negra",
                codigo: "5",
                thumbail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-128.png",
                precio: "1285.33",
                stock: "10"
            };
            let response = await request.put('/api/productos/61e0931bbcf2d104d8538206').send(modPto)
            expect(response.status).to.eql(400)

        })
/*         it('PUT modificando un producto existente deberia retornar un status 200', async()=>{
            const modPto = {
                nombre: "Mochila negra",
                descripcion: "Una mochila negra",
                codigo: "5",
                thumbail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-128.png",
                precio: "1285.33",
                stock: "10"
            };
            let response = await request.put('/api/productos/62080b190924333452e3f4ad').send(modPto)
            expect(response.status).to.eql(200)

        })
        it('DELETE a un producto existente deberia retornar un status 200', async()=>{
            let response = await request.delete('/api/productos/62080b190924333452e3f4ad')
            expect(response.status).to.eql(400)
        }) */
        it('DELETE a un producto inexistente deberia retornar un status 400', async()=>{
            let response = await request.delete('/api/productos/61e0931bbcf2d104d8538206')
            expect(response.status).to.eql(400)
        })

    })
})