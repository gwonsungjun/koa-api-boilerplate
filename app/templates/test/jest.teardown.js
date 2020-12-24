export default async function () {
  await global.__sequelize__.close()
}
