import axios from 'axios'

const testListUrl = `${process.env.SERVER_URL}:${process.env.PORT}/heroes`
const testSingleUrl = `${process.env.SERVER_URL}:${process.env.PORT}/heroes/1`
const testNonExistentUrl = `${process.env.SERVER_URL}:${process.env.PORT}/heroes/1000`

describe('Get hero list', () => {
    test('without authentication successfully', async () => {
        try {
            const res = await axios(testListUrl)

            expect(res.data.heroes.length).toBeGreaterThanOrEqual(4)
            expect(res.status).toBe(200)
        } catch (error) {
            expect(error.response.status).toBe(500)
            expect(error.response.data).toBe('Backend error')
        }
    })

    test('authenticate successfully', async () => {
        try {
            const res = await axios(testListUrl, 
                {headers: {
                    "Name": "hahow",
                    "Password": "rocks"
                }})
    
            expect(res.data.heroes.length).toBeGreaterThanOrEqual(4)
            expect(res.status).toBe(200)
            expect(res.data.heroes[0].profile).toBeDefined()
        } catch (error) {
            expect(error.response.status).toBe(500)
            expect(error.response.data).toBe('Backend error')
        }
    }, 10000)

    test('fail to authenticate due to incorrect password', async () => {
        try {
            await axios(testListUrl, 
            {headers: {
                "Name": "hahow",
                "Password": "rocksssss"
            }})
        } catch (error) {
            expect(error.response.status).toBe(401)
        }
    })

    test('fail to authenticate due to empty string', async () => {
        try {
            await axios(testListUrl, 
            {headers: {
                "Name": "",
                "Password": ""
            }})
        } catch (error) {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toBe('Name and Password cannot be empty')
        }
    })
})

describe('Get single hero', () => {
    test('without authentication successfully', async () => {
        try {
            const res = await axios(testSingleUrl)

            expect(res.data.id).toBe("1")
            expect(res.data.name).toBe('Daredevil')
            expect(res.data.image).toBe('http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg')
            expect(res.status).toBe(200)
        } catch (error) {
            expect(error.response.status).toBe(500)
            expect(error.response.data).toBe('Backend error')
        }
    })

    test('authenticate successfully', async () => {
        try {
            const res = await axios(testSingleUrl, 
                {headers: {
                    "Name": "hahow",
                    "Password": "rocks"
                }})
    
            expect(res.data.id).toBe("1")
            expect(res.data.name).toBe('Daredevil')
            expect(res.data.image).toBe('http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg')
            expect(res.status).toBe(200)
            expect(res.data.profile).toBeDefined()
            expect(res.data.profile.str).toBe(2)
        } catch (error) {
            expect(error.response.status).toBe(500)
            expect(error.response.data).toBe('Backend error')
        }
    }, 10000)

    test('fail to authenticate due to incorrect password', async () => {
        try {
            await axios(testSingleUrl, 
            {headers: {
                "Name": "hahow",
                "Password": "rocksssss"
            }})
        } catch (error) {
            expect(error.response.status).toBe(401)
        }
    })

    test('fail to authenticate due to empty string', async () => {
        try {
            await axios(testSingleUrl, 
            {headers: {
                "Name": "",
                "Password": ""
            }})
        } catch (error) {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toBe('Name and Password cannot be empty')
        }
    })

    test('get non-existent data', async () => {
        try {
            await axios(testNonExistentUrl)
        } catch (error) {
            expect(error.response.status).toBe(404)
        }
    })
})