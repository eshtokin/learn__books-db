export default interface AgreagationQuery {
  $lookup: {
    from: string,
    localField: string,
    foreignField: string,
    as: string
  }
}
