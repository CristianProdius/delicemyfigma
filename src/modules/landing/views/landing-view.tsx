"use client";

import { Hero } from "../components/hero";

export const LandingView = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Responsive background container with mobile-first approach */}
      <div
        className="
        bg-no-repeat 
        bg-[url('/img/bg.jpg')]   
        bg-center 
        bg-cover 
        w-full 
        min-h-screen 
        lg:min-h-0 
        lg:h-screen
        flex 
        items-center 
        justify-center
        py-4 
        sm:py-6
        lg:py-0
      "
      >
        <Hero />
      </div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
      consequatur incidunt quam aut illo, doloremque eos nesciunt blanditiis
      suscipit qui autem non dicta sunt laborum tempore aliquid. Reprehenderit,
      iure eum? Libero nam molestiae eum aspernatur fuga sed consectetur eveniet
      totam animi delectus, omnis officia ut ducimus sint laboriosam quam ad
      sequi! Natus numquam qui nisi, quaerat dolorum sunt quibusdam maxime?
      Pariatur magni non a aspernatur? Optio alias error sequi laboriosam rem
      itaque provident odio, dolor quos consequuntur dignissimos, eaque laborum
      molestias tenetur harum. Quod, sapiente distinctio dolores accusamus iusto
      commodi. Soluta neque ab laborum sapiente ex eaque, cupiditate consectetur
      rem voluptatum suscipit minus illo sunt unde sint. Numquam voluptatum,
      provident incidunt accusamus perferendis aut maxime vitae doloremque
      dolores nam officiis. Asperiores accusantium cumque sequi nulla, quibusdam
      facilis libero beatae voluptas! Quae quo iusto quod ea minima beatae,
      sequi autem similique iure maiores eligendi. Quisquam quas veritatis
      officia hic, ducimus aspernatur! Enim ab minima placeat aut saepe non
      blanditiis nostrum consequatur commodi quos cumque iste ad nesciunt
      reiciendis dolorum, velit repellat, corporis iusto delectus, facilis vero
      perferendis totam possimus. Rem, commodi. Odit sit distinctio nihil.
      Similique ratione quae voluptatibus. Tempora, maxime nemo deleniti, quo
      quibusdam porro, minima necessitatibus cumque odit voluptates dicta quis!
      Suscipit iste velit voluptatem, porro alias beatae eum. Excepturi cumque,
      soluta ut exercitationem aliquid pariatur hic deserunt, itaque dolorem
      quia iusto unde aliquam quos quibusdam, dolorum accusamus voluptatibus
      nihil dolores recusandae? Possimus, alias doloremque? Perferendis iure et
      excepturi! Ex ea amet alias fugit dolor dicta sint explicabo! Autem cum
      pariatur, nisi error deleniti sint laboriosam ipsam voluptates ut, facere
      provident optio perferendis veritatis accusamus quidem eos, blanditiis
      debitis? Laudantium, ea commodi veniam earum magni facere dolorum iure
      magnam deserunt repudiandae, fugit harum voluptatibus soluta impedit quas
      molestias, eligendi aliquid quaerat nemo aut dignissimos? Ab culpa harum
      tenetur officiis?
    </main>
  );
};
