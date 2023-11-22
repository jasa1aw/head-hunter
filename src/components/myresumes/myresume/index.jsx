export default function MyResume({item}) {
    return (
        <div className="card mtb-2">
            <a href="" className="h3"> {item.position} </a>
            <p>Создан {item.createdAt}</p>
            <h3>Статистика</h3>
            <div className="flex">
                <a href="" className="p3">{item.stats.show} показов</a>
                <a href="" className="p3">{item.stats.views} просмотров</a>
                <a href="" className="p3">{item.stats.applies} приглашений</a>
            </div>
        </div>
    )
}