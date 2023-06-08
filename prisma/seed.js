const {PrismaClient} = require("@prisma/client")

async function seed(){
    const db = new PrismaClient()

    await db.friendRequest.create({data: {sndEmail: "test@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test1@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test2@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test3@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test4@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test5@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test6@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test7@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test8@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test9@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test10@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test11@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
    await db.friendRequest.create({data: {sndEmail: "test12@prisma.com", recEmail: "anubhav@conceptdash.ca", status: "PENDING"}})
}

seed()