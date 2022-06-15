import S from "@sanity/desk-tool/structure-builder";
import { GrInfo } from "react-icons/gr";

export default () =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Personal Information")
        .icon(GrInfo)
        .child(
          S.document()
            .schemaType("personalInformation")
            .documentId("personalInformation"),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !["personalInformation"].includes(listItem.getId()),
      ),
    ]);
