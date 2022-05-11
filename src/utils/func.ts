import { PostProps, ColumnProps } from "./../types/column"
import { find, propEq, filter, descend, sort, compose, prop } from "ramda"
import dayjs from "dayjs"
import MarkdownIt from "markdown-it"

const mdRender = new MarkdownIt()

const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss"

export const filterPostsByColumnId = (columnId: string) =>
  filter(propEq("column", columnId))
export const findColumnByColumnId = (columnId: string) =>
  find<ColumnProps>(propEq("_id", columnId))
export const getUnix = (dayjsObj: dayjs.Dayjs) => dayjsObj.unix()
export const sortByDateNew = sort<PostProps>(
  descend(compose(getUnix, dayjs, prop("createdAt")))
)
export const formatDate = (dateStr: string) =>
  dayjs(dateStr).format(DATE_FORMAT)

export const renderMD = (content: string) => mdRender.render(content)
