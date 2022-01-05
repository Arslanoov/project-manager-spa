export default interface StepInterface {
  id: number,
  name: string,
  sort_order: string,
  status: "Not Complete" | "Complete"
}