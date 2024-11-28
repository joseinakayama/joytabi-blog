export const TableOfContents = ({ toc }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-lg">
      <p className="text-lg mb-4 font-bold">目次</p>
      <ul>
        {toc.map(data => (
          <li key={data.id} className={`contents_head_${data.name} mb-3 pb-1 border-b border-solid border-gray-300`}>
            <a href={`#${data.id}`} className="text-blue-500">
              {data.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
