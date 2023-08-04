import { render } from "@testing-library/react"
import * as React from "react"

import { DatePicker } from "./date-picker"

describe("DatePicker", () => {
  describe("Prop validation", () => {
    it("should throw an error on fromYear earlier than 1800", async () => {
      expect(() => render(<DatePicker fromYear={1200} />)).toThrowError(
        /fromYear must be greater than or equal to 1800./
      )
    })

    it("should throw an error on toYear later than 9999", async () => {
      expect(() => render(<DatePicker toYear={10000} />)).toThrowError(
        /toYear must be less than or equal to 9999./
      )
    })

    it("should throw an error on fromYear later than toYear", async () => {
      expect(() =>
        render(<DatePicker fromYear={2000} toYear={1999} />)
      ).toThrowError(/fromYear must be less than or equal to toYear./)
    })

    it("should throw an error on fromYear later than toYear", async () => {
      expect(() =>
        render(<DatePicker fromYear={2000} toYear={1999} />)
      ).toThrowError(/fromYear must be less than or equal to toYear./)
    })

    it("should throw an error on fromDay later than toDay", async () => {
      expect(() =>
        render(
          <DatePicker
            fromDay={new Date(2000, 0, 1)}
            toDay={new Date(1999, 0, 1)}
          />
        )
      ).toThrowError(/fromDate must be before or equal to toDate./)
    })
  })

  describe("Single", () => {
    it("should render", async () => {
      render(<DatePicker />)

      expect(true).toBe(true)
    })
  })
})
