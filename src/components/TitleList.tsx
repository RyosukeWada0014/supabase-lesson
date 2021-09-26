import type { VFC } from "react";
import Link from "next/link";
import Image from "next/image";
import { AddTitle } from "src/components/AddTitle";
import noImage from "public/no_image.png";

export type Title = {
  id: number;
  user_id: string;
  title: string;
  author: string;
  image_url: string;
};

type TitlesProps = {
  titles: Title[];
  uuid: string;
  getTitleList: VoidFunction;
  filterText: string;
};

export const TitleList: VFC<TitlesProps> = (props) => {
  const filterTitle = props.titles.filter((title) => {
    let searchContent = title.title + "" + title.author;
    return searchContent.toLowerCase().includes(props.filterText.toLowerCase());
  });

  return (
    <div className="grid grid-cols-3 gap-2 m-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      <AddTitle uuid={props.uuid} getTitleList={props.getTitleList} />
      {filterTitle.map((title) => {
        return (
          <Link key={title.id} href={`/title?id=${title.id}`} passHref>
            <div className="p-2 border cursor-pointer">
              <div className="flex justify-center">
                {title.image_url ? (
                  <Image
                    src={title.image_url}
                    alt="thumbnail"
                    width={126}
                    height={200}
                  />
                ) : (
                  <Image
                    src={noImage}
                    alt="thumbnail"
                    width={126}
                    height={200}
                  />
                )}
              </div>
              <div className="mt-2 text-center">{title.title}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
