import { Column, Entity, Index } from "typeorm";
import { Content } from "../Content";
import { DocsType } from "../../controller/room/Constants";

@Entity({
    name: "room_docs",
})
export class RoomDocModel extends Content {
    @Index("room_docs_room_uuid_index")
    @Column({
        length: 40,
    })
    room_uuid: string;

    @Index("room_docs_periodic_uuid_index")
    @Column({
        length: 40,
    })
    periodic_uuid: string;

    @Index("room_docs_doc_uuid_index")
    @Column({
        length: 40,
    })
    doc_uuid: string;

    @Column({
        type: "enum",
        enum: [DocsType.Dynamic, DocsType.Static],
    })
    doc_type: DocsType;

    @Index("room_docs_is_preload_index")
    @Column()
    is_preload: boolean;

    @Index("room_docs_is_delete_index")
    @Column({
        default: false,
    })
    is_delete: boolean;
}
