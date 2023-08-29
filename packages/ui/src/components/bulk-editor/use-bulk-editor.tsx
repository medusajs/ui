type ColumnType = "text" | "number" | "money_amount"

type Column = {
  type: ColumnType
  header: string | 
}

type UseBulkEditorOptions<TEntity, TSubEntity> = {
  getSubRows: (row: TEntity) => TSubEntity[]
}

const useBulkEditor = <TEntity, TSubEntity>(
  options: UseBulkEditorOptions<TEntity, TSubEntity>
) => {}

const Test = () => {
    
}

export { useBulkEditor }
